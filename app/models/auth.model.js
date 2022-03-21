var db_conn = require('../../config/db_config')
var md5 = require('md5');
var nodemailer = require('nodemailer')
const Example = require('./example.model');
var Auth = function(auth) {
    this.username = auth.username
    this.email = auth.email;
    this.password = md5(auth.password);
    this.role = 3;
    this.tanggal_daftar = new Date();
    this.isVerified = 0;
    this.token = Math.floor((Math.random() * 100) + 54)
}
// https://myaccount.google.com/lesssecureapps
let smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "narutosatu080496@gmail.com",
        pass: "damarhernanda5"
    }
})
var rand, mailOption, host, link

Auth.verifikasi = function(body, result) {
    db_conn.query("SELECT * FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = ?", ["user", "email", body.email, "token", body.token, 'isVerified', 0], 
        function(err, rows) {
            if(err){
                result(err, null)
            }else{
                if(rows.length != 0){
                    db_conn.query("UPDATE ?? SET ??=? WHERE ??=?", ["user", "isVerified", 1, "email", body.email], 
                        function(err, rows){
                            if(err){
                                result(err, null)
                            }else{
                                result(null, "Email berhasil diverifikasi")
                            }
                    })
                }else{
                    result(null, "Gagal verifikasi, email atau token salah")
                }
            }
    })
}

Auth.registrasi = function(newAuth, result) {
    db_conn.query("SELECT email FROM ?? WHERE ?? = ?", ["user", "email", newAuth.email], function(err, rows) {
        if (err) {
            result(err, null)
        } else {
            if (rows.length == 0) {
                db_conn.query("INSERT INTO user SET ?", newAuth, function(err, res) {
                    if (err) {
                        result(err, null)
                    } else {
                        rand = newAuth.token
                        host = "localhost:3001"
                        link = "http://" + host + "/auth/verifikasi?token=" + rand + "&email=" + newAuth.email
                        mailOption = {
                            to: newAuth.email,
                            subject: "Verifikasi Email",
                            html: "Silahkan konfirmasi emailnya, <br >" + "<a href=" + link + ">Click here</a>"
                        }
                        smtpTransport.sendMail(mailOption, function(errr, response) {
                            if (errr) {
                                result({
                                    success: false,
                                    isRegistered: false,
                                    message: "Email verfikasi gagal terkirim",
                                    error: errr
                                }, null)
                            } else {
                                result(null, {
                                    success: true,
                                    isRegistered: false,
                                    message: "Email verfikasi berhasil terkirim",
                                })
                            }
                        })
                    }
                })
            } else {
                result({
                    message: "email telah terdaftar"
                }, null)
            }
        }
    })
}
module.exports = Auth