const express = require('express')
const bookingRoute = express.Router()

// Middleware check session and admin
const authSession = require('../middleware/mustLogin')
bookingRoute.use(authSession)

const bookingController = require('../controllers/bookingController')
// Show booking all
bookingRoute.get('/all', bookingController.getAllBooking)

// Booking room
bookingRoute.post('/:roomId', bookingController.bookingmtroom)

// Cancel room
bookingRoute.delete('/:roomId', bookingController.bookingCancel)

module.exports = bookingRoute
