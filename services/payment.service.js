const encdec = require('../helper/enc-dec');
const emailtemplate = require('../helper/emailtemplates.json');
let sqlUtils = require('../providers/db')
let Insta = require('instamojo-nodejs');
const config = require('../config/config.json');
let mailUtils = require('../providers/mailprovider');
async function createpayment(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }

                connection.query('CALL getPackageDetails_SP(?,?)',
                    [
                        encdec.decryptSensitive(req.query.pid),
                        encdec.decryptSensitive(req.query.uid)
                    ], function (err, rows, fields) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        try {
                            if (rows && rows.length > 0) {
                                Insta.setKeys(config.paymentgateway_API_KEY, config.paymentgateway_AUTH_KEY);
                                var data = new Insta.PaymentData();
                                if (rows[0] && rows[0].length > 0) {
                                    data.buyer_name = (rows[0][0].firstname + ' ' + rows[0][0].lastname).trim();
                                    data.email = rows[0][0].email;
                                    data.phone = rows[0][0].phoneno;
                                    // data.send_sms = false;
                                    // data.send_email = false;
                                    data.allow_repeated_payments = false;
                                }
                                if (rows[1] && rows[1].length > 0) {
                                    data.purpose = rows[1][0].pname;
                                    data.amount = rows[1][0].price;
                                }
                                //Insta.isSandboxMode(false);
                                data.currency = 'INR';
                                data.setRedirectUrl(req.headers.origin + '/thankyou');
                                Insta.createPayment(data, function (error, response) {
                                    if (error) {
                                        return reject({ error: error.message, flag: false });
                                    } else {
                                        return resolve({
                                            flag: true,
                                            result: response
                                        });
                                    }
                                });
                            } else {
                                return reject({ error: err.message, flag: false });
                            }



                        }
                        catch (err) {
                            return reject({ error: err.message, flag: false });
                        }
                    });
            });
        }
        catch (e) {
            return reject({ error: e.message, flag: false });
        }
    })
}
async function savepaymentdetails(req) {
    return new Promise(async function (resolve, reject) {
        try {
            const body = req.body;
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                if (!body.paymenttype) {
                    const payment_id = body.payment_id;
                    const payment_request_id = body.payment_request_id;
                    const userid = encdec.decryptSensitive(body.userid);
                    const packageid = encdec.decryptSensitive(body.packageid)
                    Insta.setKeys(config.paymentgateway_API_KEY, config.paymentgateway_AUTH_KEY);
                    Insta.getPaymentDetails(payment_request_id, payment_id, function (error, response) {
                        if (error) {
                            return reject({ error: error.message, flag: false });
                        } else {
                            const paymentres = {
                                payment_id,
                                payment_request_id,
                                status: response.payment_request.payment.status,
                                amount: response.payment_request.payment.amount,
                                unit_price: response.payment_request.payment.unit_price,
                                fees: response.payment_request.payment.fees,
                                payment_request: response.payment_request.payment.payment_request,
                                created_at: response.payment_request.payment.created_at,
                                instrument_type: response.payment_request.payment.instrument_type,
                                billing_instrument: response.payment_request.payment.billing_instrument
                            }
                            connection.query('CALL savePaymentDetails_SP(?,?,?,?,?)',
                                [
                                    userid,
                                    packageid,
                                    JSON.stringify(paymentres),
                                    'instamojo',
                                    ''
                                ], function (err, rows, fields) {
                                    connection.release();
                                    if (err) {
                                        return reject({ error: err.message, flag: false });
                                    }
                                    try {
                                        const todaysDate = new Date();
                                        const currentYear = todaysDate.getFullYear();
                                        let template = (emailtemplate.filter(val => val.templatename === 'subscriptiontemplate'))[0].template;
                                        let ntemplate = template.replace('[PACKAGENAME]', body.packagename).replace('[YEAR]', currentYear).replace('[AMOUNT]', response.payment_request.payment.amount).replace('[DOMAIN]', req.headers.origin);
                                        const mailOptions = {
                                            from: config.email,
                                            to: body.email,
                                            subject: 'Thank You for Subscribing',
                                            html: ntemplate
                                        }
                                        mailUtils.sendmail(mailOptions).then((data) => {
                                            try {
                                                return resolve({
                                                    flag: true,
                                                    message: response
                                                });
                                            } catch (error) {
                                                return reject({ error: error.message, flag: false });
                                            }
                                        });
                                    } catch (error) {
                                        return reject({ error: error.message, flag: false });
                                    }
                                });

                        }
                    });
                } else {
                    const userid = encdec.decryptSensitive(body.userid);
                    const packageid = body.pid;
                    connection.query('CALL savePaymentDetails_SP(?,?,?,?,?)',
                        [
                            userid,
                            packageid,
                            body.amount,
                            body.paymenttype,
                            body.phoneno
                        ], function (err, rows, fields) {
                            connection.release();
                            if (err) {
                                return reject({ error: err.message, flag: false });
                            }
                            try {
                                const todaysDate = new Date();
                                const currentYear = todaysDate.getFullYear();
                                let template = (emailtemplate.filter(val => val.templatename === 'subscriptiontemplate'))[0].template;
                                let ntemplate = template.replace('[PACKAGENAME]', body.packagename).replace('[YEAR]', currentYear).replace('[AMOUNT]', body.amount).replace('[DOMAIN]', req.headers.origin);
                                const mailOptions = {
                                    from: config.email,
                                    to: body.email,
                                    subject: 'Thank You for Subscribing',
                                    html: ntemplate
                                }
                                mailUtils.sendmail(mailOptions).then((data) => {
                                    try {
                                        return resolve({
                                            flag: true,
                                            message: 'Payment Saved'
                                        });
                                    } catch (error) {
                                        return reject({ error: error.message, flag: false });
                                    }
                                });
                            } catch (error) {
                                return reject({ error: error.message, flag: false });
                            }
                        });
                }
            });
        }
        catch (e) {
            return reject({ error: e.message, flag: false });
        }
    })
}
async function getsubscriptionlist(query) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const userid = encdec.decryptSensitive(query.userid);
                connection.query('CALL getSubscriptionList_SP(?)', [userid], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            result: rows[0],
                            flag: true,
                        });
                    }
                    catch (err) {
                        return reject({ error: err.message, flag: false });
                    }
                });
            });
        }
        catch (e) {
            return reject({ error: e.message, flag: false });
        }
    })
}
module.exports = {
    createpayment,
    savepaymentdetails,
    getsubscriptionlist
}