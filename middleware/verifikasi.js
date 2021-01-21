const jwt = require('jsonwebtoken');
const config = require('../secret');

function verifikasi(roles) {
    return function (req, res, next) {
        // cek authorizations header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function (err, decode) {
                if (err) {
                    return rest.status(401).send({
                        auth: false,
                        message: 'Token tidak terdaftar'
                    });
                } else {
                    if (roles == 2) {
                        req.auth = decode;
                        next();
                    } else {
                        return rest.status(401).send({
                            auth: false,
                            message: 'Gagal mengotorisasi role anda'
                        });
                    }
                }
            });
        } else {
            return rest.status(401).send({
                auth: false,
                message: 'Token tidak tersedia'
            });
        }
    }
}

module.exports = verifikasi;