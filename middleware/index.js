var express = require('express');
var auth = require('./auth');
const verification = require('./verification');
var router = express.Router();

//menu registrasi
router.post('/api/registration', auth.registration);
router.post('/api/login', auth.login);

// alamat yang perlu otorisasi
router.get('/api/halamanrahasia', verification(2), auth.halamanRahasia);

module.exports = router;