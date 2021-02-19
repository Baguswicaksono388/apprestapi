'use strict'

var response = require('./res');
var connection = require('./connection');

exports.index = function (req, res) {
    response.ok("Aplikasiku berjalan", res) //ok punyanya res.js
};