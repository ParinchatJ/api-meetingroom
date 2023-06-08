const express = require('express')
const bookingRoute = express.Router()

const bookingController = require('../controllers/bookingController')
bookingRoute.post('/create', bookingController.createMeeting)

module.exports = bookingRoute
