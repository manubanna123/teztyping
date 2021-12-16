const encdec = require('../helper/enc-dec');
let sqlUtils = require('../providers/db')

async function getarticles() {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }

                connection.query('CALL getArticleDetailsList_SP', [], function (err, rows, fields) {
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
async function savearticle(body) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const id = body.id;
                const pname = body.name;
                const pdesc = body.description;
                const userid = body.userid;
                const isactive = body.isactive;
                const isdelete = body.isdelete;
                connection.query('CALL saveArticle_SP(?,?,?,?,?,?)',
                    [
                        pname,
                        pdesc,
                        id,
                        userid,
                        isactive,
                        isdelete
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
async function getdetails(query) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }

                connection.query('CALL getDetailsList_SP(?)', [encdec.decryptSensitive(query.userid)], function (err, rows, fields) {
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
async function saveinquiry(body) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                const name = body.name;
                const email = body.email;
                const website = body.website;
                const message = body.message;
                connection.query('CALL saveInquiry_SP(?,?,?,?)',
                    [
                        name,
                        email,
                        website,
                        message
                    ], function (err, rows, fields) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        try {
                            return resolve({
                                flag: true,
                                message: 'Inquiry Saved'
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
async function getinquiry(query) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }

                connection.query('CALL getInquiry_SP(?,?)', [query.pageindex, query.pagesize], function (err, rows, fields) {
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
async function getFeatureList() {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }

                connection.query('CALL getFeatureList_SP', [], function (err, rows, fields) {
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
    getarticles,
    savearticle,
    getdetails,
    saveinquiry,
    getinquiry,
    getFeatureList
}