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

// Controller untuk login
exports.login = function (req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "email", post.email];
    query = mysql.format(query, table);

    connection.query(query, function (error, rows_login) {
        if (error) {
            console.log(error)
        } else {
            //  res.json(rows_login);
            if (rows_login.length = 1) {
                var token = jwt.sign({ rows_login }, config.secret, {
                    expiresIn: 1440 //lama token akan hangus sekitar 25 menit
                });
                id_user = rows_login[0].id;

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address() //ip address lokal dari komputer yang digunakan
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate',
                            token: token,
                            currUser: rows_login
                         });
                    }
                });
            } else {
                res.json({ "Error": true, "Message":"Email atau password salah" });
            }
        }
    })
}

// coba halaman
exports.halamanRahasia = function (req, res) {
    response.ok("Halaman ini hanya untuk user dengan role = 2 !", res);
}