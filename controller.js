'use strict'

var response = require('./res');
var connection = require('./connection');

exports.index = function (req, res) {
    response.ok("Aplikasiku berjalan", res) //ok punyanya res.js
};

// Show table mahasiswa at DB
exports.showDataMahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fileds) {
        if (error) {
            console.log(error); //if error
        } else {
            response.ok(rows, res)
        }
    });
};

//Menampilkan data mahasiswa berdasarkan idnya
exports.showMahasiswaById = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
};

//create data mahasiswa
exports.createMahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?,?,?)',
        [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Data berhasil", res);
            }
        }
    );
};

// Update Data Mahasiswa By Id
exports.editMahasiswaById = function (req, res) {
    let id = req.body.id;

    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id=?', [nim, nama, jurusan, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Berhasi Ubah Data", res)
            }
        });
};

// Delete Data Mahasiswa By Id
exports.deleteMahasiswaById = function (req, res) {
    var id = req.body.id;

    connection.query('DELETE FROM mahasiswa WHERE id=?', [id],
    function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil Update Data", res);
        }
    });
};
