var mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'teguh',
    password: 'teguhbae',
    database: 'dbrestapi'
});

conn.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Koneksi Berhasil')
    }
});

module.exports = conn;