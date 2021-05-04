'use strict';
const db = require("../models"); //ini memanggil index.js
const Post = db.post;
const Op = db.Sequilize.Op; //menentukan where, like, punyanya Sequilize
var fs = require('fs');

// Create
exports.create = (req, res) => {
    // Validate request null
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty",
        });
        return;
    }

    // Create Post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Post.create(post) //create: methode dari Sequilize
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({ //kesalahan disisi Server/BE
                message: err.message || "Some error occurred while creating the Post"
            }); 
        });

};

// Get All data
exports.findAll = (req, res) => {
    const title = req.query.title; //parameter
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({ where: condition })
        .then((data) => { 
            res.status(200).send({
                status: "200",
                message: "success",
                data: data
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message ||"Some error occurred while retrive"
            });
        })
        
};

// Find Single
exports.findOne = (req, res) => {
    const id = req.body.id;

    Post.findByPk(id)
        .then((data) => {
            res.status(200).send({
                message: "success",
                data: data
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Error retriving post with id=" + id
            });
        });
};

exports.decode = (req, res) => {
    const images = req.body.images;
    
    let base64Image = images.split(';base64,').pop();

    var date = Date.now();
    const path = ('./images/' + date + '.png');

    // console.log(name);

    fs.writeFileSync(path, base64Image, {encoding: 'base64'});
    return res.send(path);
    // fs.writeFile(path, base64Image, {encoding: 'base64'}, function(err) {
    //     console.log('File created');
    // });
}

// Update a Post with id
exports.update = (req, res) => {

};

// Delete a Post
exports.delete = (req, res) => {

};

// Delete All Post
// exports.deleteAll() = (req, res) => {

// };

// Find all published
// exports.findAllPublished = (req, res) => {

// };