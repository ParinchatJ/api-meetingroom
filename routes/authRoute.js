const express = require('express')
const authRoute = express.Router()

// Register
const userController = require('../controllers/authController')
authRoute.post('/register', userController.createUser)

// Login
authRoute.post('/login', userController.loginUser)

module.exports = authRoute
