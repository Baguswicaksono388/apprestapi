const db = require('../../models/index-auth');
const RoleUser = db.role_user;

exports.createRoleUser = (req, res) => {
    const post = {
        url: req.body.url,
        role_id: req.body.role_id
    }

    if(!post) {
        res.status(422).send({
            message: "Content can not be empty"
        });
    } else {
        RoleUser.create(post)
        .then((data) => {
            res.status(200).send({
                message: "Success",
                data: data
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message
            })
        })
    }
}