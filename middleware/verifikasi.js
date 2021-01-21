const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi() {
    return function (req, res, next) {
        var role = req.body.role;
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
                    if (role == 2) {
                        req.auth = decode;
                        next();
                    } else {
                        return res.status(401).send({
                            auth: false,
                            message: 'Gagal mengotorisasi role anda'
                        });
                    }
                }
            });
        } else {
            return res.status(401).send({
                auth: false,
                message: 'Token tidak tersedia'
            });
        }
    }
}

module.exports = verifikasi;