var mysql = require('Mysql');

// Koneksi database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'teguh',
    password: 'teguhbae',
    database: 'dbrestapi'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Terkoneksi')
});

module.exports = conn;