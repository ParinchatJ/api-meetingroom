const express = require('express')
const bookingRoute = express.Router()

// middleware check session and admin
const authSession = require('../middleware/mustLogin')
bookingRoute.use(authSession)

const bookingController = require('../controllers/bookingController')

// show booking all
bookingRoute.get('/all', bookingController.getAllBooking)

// booking room
bookingRoute.post('/:roomId', bookingController.bookingmtroom)

// cancel room
bookingRoute.delete('/:roomId', bookingController.bookingCancel)

module.exports = bookingRoute
