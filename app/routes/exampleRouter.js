var express = require('express')
var exampleController = require('../controller/exampleController')
var router = express.Router()
const verifikasi = require('../../middleware/index')

router.get('/', exampleController.index)
router.post('/store', exampleController.create)
router.get('/edit/:id', exampleController.findById)
router.put('/update/:id', exampleController.update)
router.delete('/delete/:id', exampleController.delete)

module.exports = router