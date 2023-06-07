const express = require('express')
const authRoute = express.Router()
const authSession = require('../middleware/mustLogin')

// register
const userController = require('../controllers/userController')
authRoute.post('/register', userController.createUser)

// login
authRoute.post('/login',authSession, userController.loginUser)

module.exports = authRoute
