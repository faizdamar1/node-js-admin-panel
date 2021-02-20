const jwt = require('jsonwebtoken')
const config = require('../config/secret')

function verifikasi(role) {
    return function (req, res, next) {
        // cek token dengan header
        var tokenWithBearer = req.headers.authorization
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1]
            jwt.verify(token, config.secret, function (error, decode) {
                if (error) {
                    return res.status(401).send({
                        auth: false,
                        message: "Token tidak terdaftar"
                    })
                } else {
                    if (role == 1) {
                        req.auth = decoded
                        next()
                    } else {
                        return res.status(401).send({
                            auth: false,
                            message: "Gagal Mengotorisasi role anda"
                        })
                    }
                }
            })
        } else {
            return res.status(401).send({
                auth: false,
                message: "Token tidak tersedia"
            })
        }
    }
}

module.exports = verifikasi