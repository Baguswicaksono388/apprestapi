var connection = require('../connection');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

// Controller for Register
exports.registration = function (req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role_id: req.body.role_id,
        tanggal_daftar: new Date()
    }

    // cek email di DB
    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];
    query = mysql.format(query, table);
    // console.log(query);
    // response.ok(query, res);

    // connection.query('SELECT email from user WHERE email=?',[post.email],
    connection.query(query,
        function (error, rows) {
        if (error) {
            console.log(error)
        } else {
            // response.ok(rows.length, res);
            if (rows.length == 0) { //if not data
                var query = "INSERT INTO ?? SET ?";
                var table = ("user");
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhasil menambahkan data user baru", res);
                    }
                });
            } else {
                response.ok("Email sudah terdaftar", res);
            }
        }
    });
};