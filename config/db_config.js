var mysql = require("mysql")

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'belajar_mern_admin_panel'
})

conn.connect((err) => {
    if(err) console.log(err)
    console.log("db status:connected")
})

module.exports = conn