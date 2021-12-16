let sqlUtils = require('../providers/db')

async function getRole(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getRole_SP(?,?,?)', [
                    req.query.pageindex,
                    req.query.pagesize,
                    req.query.searchtext
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

async function addRole(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL addRole_SP(?,?,?,?,?,?)', [
                    req.body.id,
                    req.body.name,
                    req.body.isactive,
                    req.body.isdeleted,
                    req.body.createdby,
                    req.body.updatedby
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

async function getRolePermission(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    connection.release();
                    return reject({ error: err.message, flag: false });
                }
                connection.query('CALL getRolePermission_SP(?)', [
                    req.query.roleid
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

async function addRolePermission(req) {
    return new Promise(async function (resolve, reject) {
        try {
            sqlUtils.getConnection(function (err, connection) {
                if (err) {
                    return reject({ error: err.message, flag: false });
                }
                var sql = "delete from  tblrolepermission where roleid = " + req.body[0][0];
                connection.query(sql, function (err) {
                    if (err) {
                        connection.release();
                        return reject({ error: err.message, flag: false });
                    }

                    var sqlinsert = "insert into tblrolepermission(roleid,menuid,permissionid) VALUES ?";
                    connection.query(sqlinsert, [req.body], function (err) {
                        connection.release();
                        if (err) {
                            return reject({ error: err.message, flag: false });
                        }
                        return resolve({
                            flag: true,
                        });
                    });
                });
            });
        }
        catch (e) {
            return reject({ error: e.message, flag: false });
        }
    })
}
module.exports = {
    getRole,
    addRole,
    getRolePermission,
    addRolePermission
};