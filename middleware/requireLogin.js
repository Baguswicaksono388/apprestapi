const db = require("../models");
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const User = db.registration;

module.exports = (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization) {
        res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token, config.secret,(err, playload) => {
        if(err) {
            return res.status(401).json({error:"you must be logged in"});
        }

        const {id} = playload;
        User.findByPk(id)
        .then(userData => {
            req.user = userData;
            next();
        })
    })
}