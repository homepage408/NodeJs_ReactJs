'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi Rest Api Berjalan", res);
};

exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (err, rows, field) {
        if (err) {
            console.log(err)
        } else {
            response.ok(rows, res)
        }
    });
}