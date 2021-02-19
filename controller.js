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
            connection.log(error); //if error
        } else {
            response.ok(rows, res)
        }
    });
};