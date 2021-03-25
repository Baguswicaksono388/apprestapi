'use strict'
module.exports = app => {
    var roles = require('../controller/auth/roles.controller');

    app.route('/create-roles').post(roles.createRole);
    app.route('/bismillah/oke/oce').post( (req, res) => {
        var url = req.url;
        res.json(url.split('/')[1]);
    })
};
