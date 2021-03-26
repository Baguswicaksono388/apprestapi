const db = require("../models");
const dbAuth = require("../models/index-auth");
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const User = db.registration;
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
    
            RoleUser.hasMany(HasModelRoles, { foreignKey: 'role_id'});
            HasModelRoles.belongsTo(RoleUser, { foreignKey: 'role_id'});
    
            const {id} = playload;
            HasModelRoles.findOne({
                where: {
                    model_id: id
                },
                include: [{
                    model: RoleUser,
                    where: {
                        url: post_url.url
                    }
                }]
            })
            .then(data =>  {
                if(!data) {
                    res.status(400).send({
                        message: 'Error',
                    })
                } else {
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