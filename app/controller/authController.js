var connection = require('../../config/db_config')

exports.index = function(req, res){
    res.json({
        message:'hello world'
    })
    res.end()
}