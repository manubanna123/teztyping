const config = require('../config/config.json');
const emailtemplate = require('../helper/emailtemplates.json');
const encdec = require('../helper/enc-dec');
const jwt = require('jsonwebtoken');
let sqlUtils = require('../providers/db');
const jwt_decode = require('jwt-decode');
var randtoken = require('rand-token')
let mailUtils = require('../providers/mailprovider');
async function getLogin(usermodel) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ message: err.message, flag: false });
                }
                console.log(encdec.decryptSensitive(usermodel.username));
                console.log(encdec.decryptSensitive(usermodel.password));
                connection.query('CALL checkUserLoggedin_SP(?)', [encdec.decryptSensitive(usermodel.username)], function (err, existsrows, fields) {
                    if (err) {
                        connection.release();
                        return reject({ message: err.message, flag: false });
                    }
                    if (existsrows[0].length === 0) {
                        connection.query('CALL getLogin_SP(?,?)', [encdec.decryptSensitive(usermodel.username), encdec.decryptSensitive(usermodel.password)], function (err, rows, fields) {
                            if (err) {
                                connection.release();
                                return reject({ message: err.message, flag: false });
                            }
                            /* Manage your results here */
                            try {
                                console.log('rows  ',rows);
                                if (rows[0].length > 0) {
                                    const token = jwt.sign({ sub: rows[0][0].id, name: rows[0][0].firstname, audience: usermodel.username, issuer: 'smc', jwtid: 'jwtid', subject: 'Web access' }, config.secret, { expiresIn: '5h' });
                                    // const token = jwt.sign({ sub: user.id, name: username, audience: username, issuer: 'smc', jwtid: 'jwtid', subject: 'Web access' }, privateKey, { expiresIn: '7d', algorithm: 'RS256' });
                                    let decoded = jwt_decode(token);
                                    var refreshToken = randtoken.uid(256)
                                    connection.query('CALL addUserSession_SP(?,?,?,?,?,?)', [token, decoded.iat, decoded.exp, rows[0][0].id, encdec.decryptSensitive(usermodel.username), refreshToken], function (err, rowsinner, fields) {
                                        if (err) {
                                            connection.release();
                                            return reject({ message: err.message, flag: false });
                                        }
                                        tokendata = encdec.convertText('enc', JSON.stringify({
                                            ...rows[0][0],
                                            token,
                                            refreshToken
                                        }), true);
                                        return resolve({
                                            token: tokendata,
                                            flag: true,
                                            message: 'login successfully'
                                        });
                                    })

                                } else {
                                    connection.release();
                                    return resolve({
                                        flag: false,
                                        message: 'Invalid username or password.'
                                    });
                                }
                            }
                            catch (err) {
                                connection.release();
                                return reject({ message: err.message, flag: false });
                            }

                        });
                    } else {
                        connection.release();
                        return reject({ ...existsrows, message: 'You are already logged into some other device please logout from that device.', flag: false, code: 111 });
                    }
                });
            });
        }
        catch (e) {
            return reject({ message: e.message, flag: false });
        }
    })
}
async function newTicketFn(tokenmodel) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ message: err.message, flag: false });
                }
                connection.query('CALL getValidateRefreshToken(?,?)', [tokenmodel.userid, tokenmodel.refreshToken], function (err, rows, fields) {
                    if (err) {
                        connection.release();
                        return reject({ message: err.message, flag: false });
                    }
                    if (rows[0].length > 0) {
                        let decoded1 = jwt_decode(tokenmodel.token);
                        const token = jwt.sign({ sub: decoded1.sub, name: decoded1.name, audience: decoded1.name, issuer: 'smc', jwtid: 'jwtid', subject: 'Web access' }, config.secret, { expiresIn: '5h' });
                        // const token = jwt.sign({ sub: user.id, name: username, audience: username, issuer: 'smc', jwtid: 'jwtid', subject: 'Web access' }, privateKey, { expiresIn: '7d', algorithm: 'RS256' });
                        let decoded = jwt_decode(token);
                        connection.query('CALL addUserSession_SP(?,?,?,?,?,?)', [token, decoded.iat, decoded.exp, rows[0][0].userid, rows[0][0].username, tokenmodel.refreshToken], function (err, rowsinner, fields) {
                            if (err) {
                                connection.release();
                                return reject({ message: err.message, flag: false });
                            }
                            return resolve({
                                token,
                                flag: true,
                                message: 'token generated successfully'
                            });
                        })
                    } else {
                        connection.release();
                        return reject({ message: 'Token not available', flag: false });
                    }
                });
            });
        }
        catch (e) {
            return reject({ message: e.message, flag: false });
        }
    })
}
async function logoutfn(tokenmodel) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ message: err.message, flag: false });
                }
                connection.query('CALL logout_SP(?,?)', [encdec.decryptSensitive(tokenmodel.userid), tokenmodel.refreshToken], function (err, rows, fields) {
                    if (err) {
                        connection.release();
                        return reject({ message: err.message, flag: false });
                    }
                    return resolve({
                        flag: true,
                        message: 'logout successfully'
                    });
                });
            });
        }
        catch (e) {
            return reject({ message: e.message, flag: false });
        }
    })
}
async function signup(req) {
    return new Promise(async function (resolve, reject) {
        try {
            const usermodel = req.body;
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ message: err.message, flag: false });
                }
                connection.query('CALL signUp_SP(?,?,?,?,?,?,?,@userid);select @userid', [
                    usermodel.firstname,
                    usermodel.lastname,
                    usermodel.username,
                    usermodel.state,
                    usermodel.gender,
                    usermodel.phoneno,
                    usermodel.roleid,
                    0
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ message: err.message, flag: false });
                    }
                    /* Manage your results here */
                    try {
                        if (rows[0].length > 0 && rows[0][0].userid != -1) {
                            const userid = rows[0][0].userid;
                            let link = req.headers.origin + '/auth/setpassword/' + encdec.encryptSensitive
                                (userid);
                            const todaysDate = new Date();
                            const currentYear = todaysDate.getFullYear();
                            let template = (emailtemplate.filter(val => val.templatename === 'setpassword'))[0].template;
                            let ntemplate = template.replace('[LINK]', link).replace('[YEAR]', currentYear).replace('[DOMAIN]', req.headers.origin);
                            const mailOptions = {
                                from: config.email,
                                to: usermodel.username,
                                subject: 'Set up Password',
                                html: ntemplate
                            }
                            mailUtils.sendmail(mailOptions).then((data) => {
                                sqlUtils.getConnection(function (err, connection) {
                                    if (err) {
                                        return reject({ error: err.message, flag: false });
                                    }
                                    connection.query('CALL addPasswordExpireLink_SP(?,?)', [
                                        userid,
                                        link,
                                    ], function (err, rows, fields) {
                                        if (err) {
                                            return reject({ error: err.message, flag: false });
                                        }
                                        try {
                                            return resolve({
                                                flag: true,
                                                message: 'Mail sent succesfully'
                                            });
                                        } catch (error) {
                                            return reject({ error: error.message, flag: false });
                                        }

                                    });

                                })
                            });
                        } else {
                            return resolve({
                                flag: false,
                                message: 'User Already exist'
                            });
                        }
                    }
                    catch (err) {
                        return reject({ message: err.message, flag: false });
                    }

                });
            });
        }
        catch (e) {
            return reject({ message: e.message, flag: false });
        }
    })
}
async function setloginpassword(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const userid = encdec.decryptSensitive(req.userid);
                const password = encdec.decryptSensitive(req.password);
                connection.query('CALL setLoginPassword_SP(?,?)', [
                    userid,
                    password
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            message: 'Password set successfully'
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
async function checkexpirelink(req) {
    return new Promise(async function (resolve, reject) {
        try {
            const userid = encdec.decryptSensitive
                (req.userid);
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL checkexpirelink_SP(?,@retval);select @retval', [
                    userid,
                    0
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    /* Manage your results here */
                    try {
                        if (rows[0].length > 0) {
                            let result = rows[0][0].retval;
                            return resolve({
                                result: result,
                                flag: true,
                                message: 'success'
                            });
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
async function forgotpwdsendmail(req) {
    return new Promise(async function (resolve, reject) {
        try {
            const email = encdec.decryptSensitive
                (req.query.email);
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL checkEmailExists_SP(?,@retval);select @retval', [
                    email,
                    0
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    /* Manage your results here */
                    try {
                        if (rows[1] && rows[1].retval != -1) {
                            let link = req.headers.origin + '/auth/forgotpassword/' + encdec.encryptSensitive
                                (email);
                            const todaysDate = new Date();
                            const currentYear = todaysDate.getFullYear();
                            let template = (emailtemplate.filter(val => val.templatename === 'forgotpassword'))[0].template;
                            let ntemplate = template.replace('[LINK]', link).replace('[YEAR]', currentYear).replace('[DOMAIN]', req.headers.origin);
                            const mailOptions = {
                                from: config.email,
                                to: email,
                                subject: 'Forgot Password',
                                html: ntemplate
                            }
                            mailUtils.sendmail(mailOptions).then((data) => {
                                return resolve({
                                    flag: true,
                                    message: 'Please check your mail to set password'
                                });
                            });
                        } else {
                            return resolve({
                                flag: false,
                                message: 'User does not exist'
                            });
                        }
                    } catch (e) {
                        return reject({ error: e.message, flag: false });
                    }
                });





            });
        }
        catch (e) {
            return reject({ error: e.message, flag: false });
        }
    })
}
async function resetpassword(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const email = encdec.decryptSensitive(req.email);
                const password = encdec.decryptSensitive(req.password);
                connection.query('CALL resetPassword_SP(?,?,@retval);select @retval', [
                    email,
                    password,
                    0
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        if (rows[0].length > 0) {
                            let result = rows[0][0].retval;
                            return resolve({
                                result: result,
                                flag: true,
                                message: 'Password set successfully'
                            });
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
async function getdropdowns() {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getDropDowns_SP', [
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            result: rows
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
    getLogin,
    newTicketFn,
    signup,
    setloginpassword,
    checkexpirelink,
    forgotpwdsendmail,
    resetpassword,
    logoutfn,
    getdropdowns
};