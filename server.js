const express = require('express')
const bodyParser = require('body-parser')

var morgan = require('morgan')
const app = express()
var cors = require('cors')

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

//call router
var routes = require('./app/routes/')
routes(app)

//liestening
app.listen(3001, () => {
    console.log(`server started on port 3001`)
})

