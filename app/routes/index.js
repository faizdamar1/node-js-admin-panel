'use strict'

module.exports = function (app) {
    /* Test route index */
    const homeController = require('../controller/homeController')
    app.route('/').get(homeController.index)

    /* Auth route */
    app.use('/auth', require('./authRouter'))

    /* Route Example Group */
    app.use('/example', require('./exampleRouter'))
}