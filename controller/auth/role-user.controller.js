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
    HasModelRoles.belongsTo(Role, { foreignKey: 'id'});
    Role.findAll({
        attributes: [['id', 'role_id'],'name','guard_name'],
        // include : [RoleUser, HasModelRoles]
        include : [{ 
            model: RoleUser,
            where:{url: '/create'},
            attributes: ['role_id','url'], 
            required: true,
            },{
            model: HasModelRoles,
            where: {model_id:4},
            attributes: [['model_id','user_id'],'role_id'],
            required:true
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