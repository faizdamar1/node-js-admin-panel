'use strict'

var db_conn = require('../../config/db_config')

var Example = function (example){
    this.name = example.name;
    this.qty = example.qty;
}
Example.findAll = function (result){
    db_conn.query("SELECT * FROM examples WHERE status = ?", 1 , function (err, res){
        if(err){
            console.log("error", err)
            result(err, null)
        }else{
            console.log("data", res)
            result(null, res)
        }
    })
}
Example.create = function (newExample, result){
    db_conn.query("INSERT INTO examples set ?", newExample, function (err, res){
        if (err){
            console.log("error", err)
            result(err, null)
        }else{
            console.log()
            result(null, res.insertId)
        }
    })
}

Example.findById = function (id, result){
    db_conn.query("SELECT * FROM examples WHERE id = ?", id, function (err, res){
        if(err){
            console.log("error", err)
            result(err, null)
        }else{
            console.log("data ", res)
            result(null, res)
        }
    })
}

Example.update = function (id, example, result){
    db_conn.query("UPDATE examples SET name=?, qty=? WHERE id = ?",[example.name, example.qty, id], function (err, res){
        if(err){
            console.log("error ", err)
            result(err, null)
        }else{
            console.log("data ", res)
            result(null, res)
        }
    })
}

Example.delete = function (id, result){
    db_conn.query("UPDATE examples SET status=? WHERE id= ?", [0, id], function (err, res){
        if(err){
            console.log("error ", err)
            result(err, null)
        }else{
            console.log("data ", res)
            result(null, res)
        }
    })
}

module.exports = Example