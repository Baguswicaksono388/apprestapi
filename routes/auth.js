'use strict'
module.exports = app => {
    var roles = require('../controller/auth/roles.controller');
    var roleUser = require('../controller/auth/role-user.controller');

    app.route('/create-roles').post(roles.createRole);
    app.route('/create-role-user').post(roleUser.createRoleUser);
    app.route('/bismillah/oke/oce').post( (req, res) => {
        var url = req.url;
        res.json(url.split('/')[1]);
    })
};
