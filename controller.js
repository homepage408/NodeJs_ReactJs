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

// Menambahkan data mahasiswa
exports.tambahmahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) values (?,?,?)', [nim, nama, jurusan],
        function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                response.ok('Berhasil Menambahkan data', res)
            }
        });
}

// Mengubah data berdasarkan ID
exports.ubahmahasiswa = function (req, res) {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim, nama, jurusan, id],
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                response.ok('Berhasil Ubah data', res);
            }
        });
}

// Menghapus data berdasarkan id
exports.hapusmahasiswa = function (req, res) {
    var id = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?', [id],
        function (err, rows, field) {
            if (err) {
                console.log(err)
            } else {
                response.ok('Berhasil Menghapus Data', res)
            }
        });
}

// Menampilkan matakuliah group
exports.tampilgroupmatakuliah = function (req, res) {
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks from krs join matakuliah join mahasiswa where krs.id_matakuliah = matakuliah.id_matakuliah and krs.id_mahasiswa = mahasiswa.id_mahasiswa order by mahasiswa.id_mahasiswa',
        function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                response.okNested(rows, res)
            }
        }
    )
}