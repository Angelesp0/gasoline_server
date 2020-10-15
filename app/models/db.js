var mysql = require('mysql');
const dbConfig = require("../config/db.config.js");

var connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online')
});

module.exports = connection;