var connection = require('../../config/db_config')

const Auth = require('../models/auth.model')

exports.login = function (req, res) {
    res.json({
        message: 'SIGN IN'
    })
    res.end()
}

exports.registrasi = function (req, res) {
    const newAuth = new Auth(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Pleas provide all require field"
        })
    } else {
        Auth.registrasi(newAuth, function (err, auth) {
            if (err) res.send(err)
            res.send({
                error: false,
                message: "data added successfully",
                data: auth
            })
        })
    }
}

exports.verifikasi = function(req, res){
    if(req.query.token == null || req.query.email == null){
        res.status(400).send({
            error: true,
            message: "Token atau email salah"
        })
    }else{
        Auth.verifikasi(req.query,function(err, verifikasi){
            if(err) res.send(err)
            res.send({
                error: false,
                message: verifikasi
            })
        })
    }    
}