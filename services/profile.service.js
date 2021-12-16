const encdec = require('../helper/enc-dec');
let sqlUtils = require('../providers/db');

async function getprofile(query) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const userid = encdec.decryptSensitive(query.userid);
                connection.query('CALL getProfile_SP(?)', [userid], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            result: rows,
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
async function saveprofile(body) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const id = encdec.decryptSensitive(body.uid);
                const firstname = body.firstname;
                const lastname = body.lastname;
                const password = body.password;
                const email = body.email;
                const phoneno = body.phoneno;
                const state = body.state;
                const gender = body.gender;
                const roleid = body.roleid;
                const isactive = body.isactive;
                const isdelete = body.isdelete;
                connection.query('CALL saveProfile_SP(?,?,?,?,?,?,?,?,?,?,?)',
                    [
                        id,
                        firstname,
                        lastname,
                        phoneno,
                        password,
                        state,
                        gender,
                        isactive,
                        isdelete,
                        email,
                        roleid
                    ], function (err, rows, fields) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        try {
                            return resolve({
                                flag: true,
                                message: 'Details Updated Successfully'
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
    getprofile,
    saveprofile
}