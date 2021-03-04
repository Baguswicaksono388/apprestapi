const db = require("../models"); //ini memanggil index.js
const Post = db.registration;
const Op = db.Sequilize.Op; //menentukan where, like, punyanya Sequilize

// Create Registration user
exports.registration = async (req, res) => {
    const post = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
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
                    message: success,
                    data: data
                });
        }).catch((err) => {
            res.status(500).send({ //kesalahan disisi Server/BE
                message: err.message || "Some error occurred while creating the Post"
            }); 
        });
    }
}