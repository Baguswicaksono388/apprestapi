'use strict'
module.exports = app => {
    const requireLogin = require('../middleware/requireLogin');
    var roles = require('../controller/auth/roles.controller');
    var roleUser = require('../controller/auth/role-user.controller');

    app.route('/create-roles').post(roles.createRole);
    app.route('/create-role-user').post(roleUser.createRoleUser);
    app.route('/get-role-user').get(roleUser.roleUser);
    app.route('/bismillah/auth').post(requireLogin, (req, res) => {
        var url = req.url;
        res.json(url);
    })
};
