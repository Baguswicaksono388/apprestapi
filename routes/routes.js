'use strict'

module.exports = app => {
    const requireLogin = require('../middleware/requireLogin');
    var posts = require("../controller/post.controller");
    var registration = require("../controller/registration.controller");
    var practice_study = require("../controller/practice_study.controller");
    // let router = require("express").Router();
    // // // Create a new Post
    // router.post("/", posts.create);
    // app.use("/api/posts", router);
    // router.get('/coba', (req, res) => {
    //     res.send("Hay");
    // });

    app.route('/create').post(requireLogin,posts.create);
    app.route('/api/findall').get(requireLogin, posts.findAll);
    app.route('/api/findbyPk').get(posts.findOne);
    app.route('/decode').get(posts.decode);
    app.route('/schedule').get(posts.schedule);

    app.route('/registration').post(registration.registration);
    app.route('/login').post(registration.login);
    app.route('/delete-user').post(registration.deleteUser);
    app.route('/show-user').get(registration.showUser);

    app.route('/api/get-practice-study').post(practice_study.findAll);
    app.route('/api/get-soal-latihan-sd').post(practice_study.getSoalLatihanSD);
};