const encdec = require('../helper/enc-dec');
let sqlUtils = require('../providers/db')

async function getTest(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getTest_SP(?,?,?,?,?)', [
                    req.query.pagesize,
                    req.query.pageindex,
                    req.query.searchtext,
                    req.query.islivetest,
                    req.query.language
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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

async function getFreeTest(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getFreeTest_SP(?,?,?,?,?)', [
                    req.query.type,
                    req.query.islivetest,
                    req.query.pageindex,
                    req.query.pagesize,
                    req.query.userid
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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
async function getTestResults(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getTestResults_SP(?,?,?,?,?,?)', [
                    encdec.decryptSensitive(req.query.userid),
                    req.query.pageindex,
                    req.query.pagesize,
                    req.query.type,
                    req.query.islivetest,
                    req.query.name
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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
async function getTestResultsByID(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getTestResultById_SP(?,?)', [
                    req.query.id,
                    req.query.userid
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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
async function getFreeTestByID(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getFreeTestByID_SP(?,?,?)', [
                    req.query.id,
                    req.query.type,
                    req.query.userid
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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
async function saveTest(body) {
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
                connection.query('CALL addTest_SP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    [
                        body.id, body.name, body.description, body.type, body.islivetest, body.allowusersetting, body.backspaceoption,
                        body.highlightoption, body.timeduration, body.content, body.ispaid, body.language, body.isactive, body.isdeleted,
                        body.createdby, body.updatedby, body.hindicontent, body.startdate, body.enddate, body.ishindi, body.isenglish, body.passingmarks,
                        body.hcldc, body.hcs, body.rldc, body.scgl, body.rrb, body.schsl
                    ], function (err, rows, fields) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        try {
                            return resolve({
                                flag: true,
                                message: 'Test added successfully'
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
async function saveTestResults(body) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL addTestResuts_SP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    [
                        body.testid, body.result, body.gs, body.gwpm, body.ns, body.ra, body.ga,
                        body.error, body.tlw, body.tpw, body.cw, body.icw, body.tltime, body.tktime,
                        body.paragraph, body.userid, body.content
                    ], function (err, rows, fields) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        try {
                            return resolve({
                                flag: true,
                                message: 'Test results added successfully'
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
async function getLiveTestRank(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getLiveTestScore_SP(?)', [
                    req.query.testid
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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

async function getLearningTest(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getLearningTest_SP(?,?,?,?,?)', [
                    req.query.pageindex,
                    req.query.pagesize,
                    req.query.searchtext,
                    req.query.language,
                    req.query.practiceset
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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

async function getLearningTestForUsers(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getLearningTest_User_SP(?)', [
                    req.query.language
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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

async function getLearningTestForUsersById(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getLearningTest_User_ById_SP(?,?)', [
                    req.query.testid,
                    req.query.language
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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

async function getLearningTestForUsersByType(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getLearningTest_User_byType_SP(?,?)', [
                    req.query.testid,
                    req.query.language
                ], function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        return reject({ error: err.message, flag: false });
                    }
                    try {
                        return resolve({
                            flag: true,
                            ...rows
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

async function saveLearningTest(body) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL addLerningTest_SP(?,?,?,?,?,?,?,?,?,?,?,?)',
                    [
                        body.id, body.name, body.description, body.content, body.isactive, body.isdeleted
                        , body.ispracticeset, body.language, body.hcontent, body.duration, body.passingmarks, body.ispaid
                    ], function (err, rows, fields) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        try {
                            return resolve({
                                flag: true,
                                message: 'Test added successfully'
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
    saveTest,
    getTest,
    getFreeTest,
    getFreeTestByID,
    saveTestResults,
    getTestResults,
    getTestResultsByID,
    getLiveTestRank,
    getLearningTest,
    saveLearningTest,
    getLearningTestForUsers,
    getLearningTestForUsersById,
    getLearningTestForUsersByType
}