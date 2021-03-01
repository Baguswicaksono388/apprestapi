const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verification(roles) {
    return function (req, rest, next) {
        // check authorizzation header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1]; //mengambil jwtnya saja
            // verifikasi
            jwt.verify(token, config.secret, function (error, decoded) {
                if (error) {
                    return rest.status(401).send({ auth: false, message: 'Token tidak terdaftar' });
                } else {
                    if (roles == 2) {
                        req.auth = decoded;
                        next();
                    } else {
                        return rest.status(401).send({ auth: false, message: 'Gagal mengotorisasi role anda' });
                    }
                }
            });
        } else {
            return rest.status(401).send({ auth: false, message: 'Token tidak tersedia' });
        }
    }
}

module.exports = verification;