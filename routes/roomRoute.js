const express = require('express')
const roomRoute = express.Router()

// middleware check session and admin
const authSession = require('../middleware/mustLogin')
const isAdminCheck = require('../middleware/adminCheck')

roomRoute.use(authSession)

const roomController = require('../controllers/roomController')
roomRoute.post('/create', isAdminCheck, roomController.createRoom)

roomRoute.get('/all', roomController.getAllRoom)

// roomRoute.get('/:id', roomController.getRoomById)

roomRoute.post('/available', roomController.avilableRoom)

module.exports = roomRoute
