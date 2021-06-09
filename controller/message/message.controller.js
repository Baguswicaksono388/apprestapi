const dbMessage = require('../../models/index-message');
const jwt = require('jsonwebtoken');
const config = require('../../config/secret');
const Message = dbMessage.message;
const Op = dbMessage.Sequelize.Op; //menentukan where, like, punyanya Sequilize
const Sequelize = require('sequelize');
var dateFormat = require('dateformat')

exports.sendMessage = (req, res) => {
    const {authorization} = req.headers;

    if(!authorization) {
        res.status(401).json({error:"you must be logged in"})
    } else {
        const token = authorization.replace("Bearer ","");
        jwt.verify(token, config.secret,(err, playload) => {
            if(err) {
                return res.status(401).json({error:"you must be logged in"});
            }

            const {id} = playload;
            const sendMessage = {
                id_sender: id,
                id_receiver: req.body.id_receiver,
                message: req.body.message
            }

            Message.create(sendMessage)
            .then((data) => {
                res.status(200).send({
                    message: "success",
                    data: data
                });
            }).catch((err) => {
                res.status(500).send({
                    message: err.message
                })
            })
        });
    }
}

exports.getMessage = (req, res) => {
    const {authorization} = req.headers;

    if(!authorization) {
        res.status(401).json({error:"you must be logged in"})
    } else {
        const token = authorization.replace("Bearer ","");
        jwt.verify(token, config.secret,(err, playload) => {
            if(err) {
                return res.status(401).json({error:"you must be logged in"});
            }

            const {id} = playload;
            const now = new Date();
            let nowDate = dateFormat(now, "yyyy-mm-d hh:mm:ss")
            let date = dateFormat("yyyy");
            console.log(id);
            Message.findAll({
                // where: {id_sender:id, createdAt:{[Op.gt]:nowDate}},
                // where:{createdAt:{[Op.gt]:date}},
                group: [Sequelize.fn('YEAR',Sequelize.col('createdAt'))]
            })
            .then((data) => {
                res.status(200).send({
                    message: "success",
                    data: data,
                    length: data.length
                })
                console.log(dateFormat(now, "yyyy-mm-d hh:mm:ss"));
            }).catch((err) => {
                res.status(500).send({
                    message: err.message
                })
            })
        });
    }
}