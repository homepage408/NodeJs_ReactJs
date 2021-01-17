'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi Rest Api Berjalan", res);
};

// Menampilkan semua mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (err, rows, field) {
        if (err) {
            console.log(err)
        } else {
            response.ok(rows, res)
        }
    });
}

// Menampilkan mahasiswa data mahsiswa berdasarkan id
exports.tampilberdasarid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                response.ok(rows, res);
            }
        });
}