var express = require('express');
var auth = require('./auth');
var router = express.Router();

//menu registrasi
router.post('/api/registration', auth.registration);

module.exports = router;