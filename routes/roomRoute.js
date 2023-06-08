const express = require('express')
const roomRoute = express.Router()

// middleware check session and admin
const authSession = require('../middleware/mustLogin')

const roomController = require('../controllers/roomController')
roomRoute.post('/create', authSession, roomController.createRoom)

roomRoute.get('/all', roomController.getAllRoom)

roomRoute.get('/:id', roomController.getRoomById)

module.exports = roomRoute
