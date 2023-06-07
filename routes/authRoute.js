const express = require('express')
const authRoute = express.Router()

// register
const userController = require('../controllers/userController')
authRoute.post('/register', userController.createUser)

// login
authRoute.post('/login', userController.loginUser)

module.exports = authRoute
