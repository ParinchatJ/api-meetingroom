const express = require('express')
const roomRoute = express.Router()

// Middleware check session and admin
const authSession = require('../middleware/mustLogin')
const isAdminCheck = require('../middleware/adminCheck')

roomRoute.use(authSession)

const roomController = require('../controllers/roomController')
// Create room
roomRoute.post('/create', isAdminCheck, roomController.createRoom)

// Get all room
roomRoute.get('/all', roomController.getAllRoom)

// Get room by ID
roomRoute.get('/:id', roomController.getRoomById)

// Get available room
roomRoute.post('/available', roomController.avilableRoom)

module.exports = roomRoute
