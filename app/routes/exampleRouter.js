var express = require('express')
var exampleRoute = require('../controller/exampleController')
var router = express.Router()
var verifikasi = require('../../middleware/index')

router.get('/', exampleRoute.index)
router.post('/store', exampleRoute.create)
router.get('/edit/:id', exampleRoute.findById)
router.put('/update/:id', exampleRoute.update)
router.delete('/delete/:id', exampleRoute.delete)

module.exports = router