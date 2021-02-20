'use strict'

module.exports = function (app) {
    /* Auth route */
    const authController = require('../controller/authController')
    app.route('/').get(authController.index)

    /* Route Example Group */
    app.use('/example', require('./exampleRouter'))
}