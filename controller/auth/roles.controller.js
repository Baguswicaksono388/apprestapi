const db = require('../../models/index-auth');
const Role = db.roles;

exports.createRole = (req, res) => {
    const post = {
        name: req.body.name,
        guard_name: req.body.guard_name
    }

    if (!post.name || !post.guard_name) {
        res.status(422).send({
            message: "Content can not be empty"
        });
        return
    } else {
        Role.create(post)
        .then( data => {
            res.status(200).send({
                message: "Success",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    }
};