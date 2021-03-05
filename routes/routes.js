'use strict'
module.exports = app => {
    var posts = require("../controller/post.controller");
    var registration = require("../controller/registration.controller");
    // let router = require("express").Router();
    // // // Create a new Post
    // router.post("/", posts.create);
    // app.use("/api/posts", router);

    app.route('/create').post(posts.create);
    app.route('/api/findall').get(posts.findAll);
    app.route('/api/findbyPk').get(posts.findOne);


    app.route('/registration').post(registration.registration);
}