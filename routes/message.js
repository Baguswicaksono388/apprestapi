'use strict'
module.exports = app => {
    var message = require('../controller/message/message.controller');

    app.route('/send-message').post(message.sendMessage);
    app.route('/get-message').get(message.getMessage);
}