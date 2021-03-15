const db = require("../models"); //ini memanggil index.js
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Post = db.registration;
const Op = db.Sequilize.Op; //menentukan where, like, punyanya Sequilize
var config = require('../config/secret');

// Create Registration user
exports.registration = async (req, res) => {
    const post = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        role_id: req.body.role_id
    }

    if (!post.username || !post.role_id) {
        res.status(400).send({
            message: "Content can not be empty",
        });
        return
    } else {
        Post.findOrCreate({
            where: {
                email: post.email,
            },
            defaults: {
                //properties you want on create
                username: post.username,
                password: post.password,
                role_id: post.role_id
            }
        })
            .then((data) => {
                res.status(200).send({
                    message: "created",
                    data: data
                });
            }).catch((err) => {
                res.status(500).send({ //kesalahan disisi Server/BE
                    message: err.message || "Some error occurred while creating the Post"
                });
            });
    }
};

exports.login = (req, res) => {
    const post = {
        email: req.body.email,
        password: req.body.password
    }

    var isValidPassword = function (userpass, password) {
        return bcrypt.compareSync(password, userpass);
    }

    Post.findOne({
        where: {
            email: post.email,
        }
    }).then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "email tidak ada",
                data: null
            });
            return;
        }
        if (!isValidPassword(data.password, post.password)) {
            res.status(404).send({
                message: "Incorrect password",
                data: null
            });
            return;
        }
        else {
            var token = jwt.sign({ data }, config.secret, {
                expiresIn: 1440
            });
            user = {
                "username": data.username,
                "email": data.email
            }
            res.status(200).send({
                message: "ada",
                token: token,
                data: user
            });
            // delete data.password;
            return;
        }
    }).catch((err) => {
        res.status(500).send({ //kesalahan disisi Server/BE
            message: err.message || "Some error occurred while creating the Post"
        });
    });
};

exports.deleteUser = (req, res) => {
    const post = {
        id: req.body.id
    }

    Post.destroy({
        where: {
            id: post.id
        }
    }).then(function (data) {
        res.status(200).send({
            message: "delete",
            data: data
        });
    }).catch((err) => {
        res.status(500).send({ //kesalahan disisi Server/BE
            message: err.message || "Some error occurred while creating the Post"
        });
    });
};

exports.showUser = (res) => {
    Post.findAll().then(function (data) {
        res.status(200).send({
            message: "delete",
            data: data
        });
    }).catch((err) => {
        res.status(500).send({ //kesalahan disisi Server/BE
            message: err.message || "Some error occurred while creating the Post"
        });
    })
};