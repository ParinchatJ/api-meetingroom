const express = require('express')

const app = express()

// json parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
// authRoute
const authRoute = require('../routes/authRouter')
app.use('/', authRoute)

// roomRoute
const roomRoute = require('../routes/roomRoute')
app.use('/room', roomRoute)

// bookingRoute
const bookingRoute = require('../routes/bookingRoute')
app.use('/booking', bookingRoute)

module.exports = app
