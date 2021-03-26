const db = require('../../models/index-auth');
const Role = db.roles;
const RoleUser = db.role_user;
const HasModelRoles = db.has_model_roles;

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

exports.roleUser = (req, res) => {
    Role.hasMany(HasModelRoles, { foreignKey: 'role_id'});
    Role.hasMany(RoleUser, { foreignKey: 'role_id'});
    RoleUser.belongsTo(Role, { foreignKey: 'id'});
    HasModelRoles.belongsTo(RoleUser, { foreignKey: 'role_id'});
    Role.findAll({
        include: [{
            model:RoleUser,
            where: {
                url:'/api/findall'
            }
        }],
        include: [{
            model: HasModelRoles,
            where: {
                model_id:2
            }
        }]
    }).then(data => {
        res.status(200).send({
            message: "Success",
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}