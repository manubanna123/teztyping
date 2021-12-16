const encdec = require('../helper/enc-dec');
let sqlUtils = require('../providers/db')

async function getpackage(query) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getPackageDetailsList_SP(?,?,?)', [
                    query.pageindex, query.pagesize, query.searchtext
                ], function (err, rows, fields) {
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
async function savepackage(body) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const id = body.id;
                const pname = body.name;
                const pdesc = body.description;
                const duration = body.duration;
                const dtype = body.dtype;
                const price = body.price;
                connection.query('CALL savePackage_SP(?,?,?,?,?,?)',
                    [
                        pname,
                        pdesc,
                        duration,
                        dtype,
                        price,
                        id
                    ], function (err, rows, fields) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        try {
                            return resolve({
                                flag: true,
                                message: 'Package created successfully'
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
async function deletepackage(body) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const id = encdec.decryptSensitive(body.id);

                connection.query('CALL deletePackage_SP(?)',
                    [
                        id
                    ], function (err, rows, fields) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        try {
                            return resolve({
                                flag: true,
                                message: 'Package deleted successfully'
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
    getpackage,
    savepackage,
    deletepackage
};