const db = require("../models"); //ini memanggil index.js
const Post = db.post;
const Op = db.Sequilize.Op; //menentukan where, like, punyanya Sequilize

// Create
exports.create = (req, res) => {
    // Validate request null
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty"
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

};

// Find Single
exports.findOne = (req, res) => {

};

// Update a Post with id
exports.update = (req, res) => {

};

// Delete a Post
exports.delete = (req, res) => {

};

// Delete All Post
exports.deleteAll() = (req, res) => {

}

// Find all published
exports.findAllPublished = (req, res) => {

}