const encdec = require('../helper/enc-dec');
let sqlUtils = require('../providers/db')
var fs = require('fs');
const { enc } = require('crypto-js');
const encDec = require('../helper/enc-dec');
const multer = require('multer');
async function gettutorial(query) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getTutorialList_SP(?,?,?)', [query.pageindex, query.pagesize, query.searchtext], function (err, rows, fields) {
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
async function savetutorialpdf(req, res) {
    return new Promise(async function (resolve, reject) {
        try {
            let mainbody = req.body;
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                if (req.files) {
                    fs.writeFile(   __dirname +"/../documents/tutorials/" + req.files.file.name, req.files.file.data, "binary", function (err) {
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        } else {
                            const body = JSON.parse(mainbody.newpdf);
                            let link =  'documents/tutorials/' + req.files.file.name;
                            connection.query('CALL saveTutorialPdf_SP(?,?,?,?,?,?,?,?,?)',
                                [
                                    body.name,
                                    body.description,
                                    link,
                                    body.id,
                                    encDec.decryptSensitive(body.userid),
                                    body.isactive,
                                    body.isdelete,
                                    req.files.file.name,
                                    true
                                ], function (err, rows, fields) {
                                    connection.release();
                                    if (err) {
                                        return reject({ error: err.message, flag: false });
                                    }
                                    try {
                                        return resolve({
                                            flag: true,
                                            message: 'Tutorial updated successfully'
                                        });
                                    }
                                    catch (err) {
                                        return reject({ error: err.message, flag: false });
                                    }
                                });
                        }
                    });

                } else {
                    const body = JSON.parse(req.body.newpdf);
                    // let link = req.protocol + '://' + req.get('host') + '/documents/tutorials/' + req.files.file.name;
                    connection.query('CALL saveTutorialPdf_SP(?,?,?,?,?,?,?,?,?)',
                        [
                            body.name,
                            body.description,
                            '',
                            body.id,
                            encDec.decryptSensitive(body.userid),
                            body.isactive,
                            body.isdelete,
                            '',
                            false
                        ], function (err, rows, fields) {
                            connection.release();
                            if (err) {
                                return reject({ error: err.message, flag: false });
                            }
                            try {
                                return resolve({
                                    flag: true,
                                    message: 'Tutorial updated successfully'
                                });
                            }
                            catch (err) {
                                return reject({ error: err.message, flag: false });
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
// async function deletetutorial(body) {
//     return new Promise(async function (resolve, reject) {
//         try {
//             sqlUtils.getConnection(function (err, connection) {
//                 if (err) {
//                     return reject({ error: err.message, flag: false });
//                 }
//                 const id = encdec.decryptSensitive(body.id);

//                 connection.query('CALL deleteTutorial_SP(?)',
//                     [
//                         id
//                     ], function (err, rows, fields) {
//                         connection.release();
//                         if (err) {
//                             return reject({ error: err.message, flag: false });
//                         }
//                         try {
//                             return resolve({
//                                 flag: true,
//                                 message: 'Package deleted successfully'
//                             });
//                         }
//                         catch (err) {
//                             return reject({ error: err.message, flag: false });
//                         }
//                     });
//             });
//         }
//         catch (e) {
//             return reject({ error: e.message, flag: false });
//         }
//     })
// }
module.exports = {
    gettutorial,
    savetutorialpdf,
    // deletetutorial
};