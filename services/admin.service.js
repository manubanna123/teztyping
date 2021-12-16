const { enc } = require('crypto-js');
const encdec = require('../helper/enc-dec');
let sqlUtils = require('../providers/db')

async function savevideosettings(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const id = req.id;
                const name = req.name;
                const description = req.desc;
                const category = req.category;
                const path = req.path;
                const thumbnail = req.thumbnail;
                const userid = encdec.decryptSensitive(req.userid);
                connection.query('CALL saveVideoSettings_SP(?,?,?,?,?,?,?)', [
                    name,
                    description,
                    category,
                    path,
                    thumbnail,
                    id,
                    userid
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            message: 'Video Settings saved'
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
async function getvideosettings(query) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }

                connection.query('CALL getVideoSettings_SP(?,?,?)', [
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
                            message: 'Settings saved'
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
async function getvideosettingbyid(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const id = encdec.decryptSensitive
                    (req.query.id);
                connection.query('CALL getVideoSettingById_SP(?)', [id], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            result: rows[0],
                            flag: true,
                            message: 'Settings saved'
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
async function deletevideosetting(body) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const id = encdec.decryptSensitive(body.id);
                const userid = encdec.decryptSensitive(body.userid);
                connection.query('CALL deleteVideoSetting_SP(?,?)',
                    [
                        id,
                        userid
                    ], function (err, rows, fields) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        try {
                            return resolve({
                                flag: true,
                                message: 'Video deleted successfully'
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
async function getwatchvideos(query) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }

                connection.query('CALL getWatchVideos_SP(?)', [query.searchtext], function (err, rows, fields) {
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
module.exports = {
    savevideosettings,
    getvideosettings,
    getvideosettingbyid,
    deletevideosetting,
    getwatchvideos
};