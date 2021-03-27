const db = require("../models");
const dbAuth = require("../models/index-auth");
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const User = db.registration;
const Role = dbAuth.roles;
const RoleUser = dbAuth.role_user;
const HasModelRoles = dbAuth.has_model_roles;

module.exports = (req, res, next) => {
    const post_url = {
        url:req.url
    }
    const {authorization} = req.headers

    if(!authorization) {
        res.status(401).json({error:"you must be logged in"})
    } else {
        const token = authorization.replace("Bearer ","");
        jwt.verify(token, config.secret,(err, playload) => {
            if(err) {
                return res.status(401).json({error:"you must be logged in"});
            }
    
            Role.hasMany(HasModelRoles, { foreignKey: 'role_id'});
            Role.hasMany(RoleUser, { foreignKey: 'role_id'});
            RoleUser.belongsTo(Role, { foreignKey: 'id'});
            HasModelRoles.belongsTo(Role, { foreignKey: 'id'});
    
            const {id} = playload;
            Role.findAll({
                attributes: [['id', 'role_id'],'name','guard_name'],
                // include : [RoleUser, HasModelRoles]
                include : [{ 
                    model: RoleUser,
                    where:{url: post_url.url},
                    attributes: ['role_id','url'], 
                    required: true,
                    },{
                    model: HasModelRoles,
                    where: {model_id:id},
                    attributes: [['model_id','user_id'],'role_id'],
                    required:true
                    }]
            })
            .then(data =>  {
                if(data.length < 1) {
                    // gagal authorization
                    res.status(400).send({
                        message: 'Error',
                    })
                    console.log(data);
                } else {
                    console.log(data);
                    //berhasil authorization
                    next();
                }
            }).catch((err) => {
                res.status(500).send({
                    message: err.message
                })
            })
            // User.findByPk(id)
            // .then(userData => {
            //     req.user = userData;
            //     next();
            // })
        })
    }
    
}