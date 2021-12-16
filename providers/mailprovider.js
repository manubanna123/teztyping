var nodemailer = require('nodemailer');
const config = require('../config/config.json');


var transporter = nodemailer.createTransport({
    service: 'smtp',
    host: 'smtp.hostinger.in',
    port: 587,
    auth: {
        user: config.email,
        pass: config.password
    }
});
async function sendmail(mailOptions) {
    return new Promise(async function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            try {
                if (error) {
                    console.log(error.message);
                    return reject({ error: error.message, flag: false });
                } else {
                    return resolve({
                        flag: true,
                        message: info.response
                    });
                }
            } catch (error) {
                return reject({ error: error.message, flag: false });
            }

        });
    });
}
module.exports = { sendmail };


