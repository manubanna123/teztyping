let mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'root', 
    database: 'tez_typing',
    multipleStatements: true
});


module.exports = pool;