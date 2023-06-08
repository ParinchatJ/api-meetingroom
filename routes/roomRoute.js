const express = require('express')
const roomRoute = express.Router()

// middleware check session and admin
const authSession = require('../middleware/mustLogin')
roomRoute.use(authSession)

const roomController = require('../controllers/roomController')
roomRoute.post('/create', roomController.createRoom)

module.exports = roomRoute
