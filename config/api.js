const express = require('express')

const app = express()

// json parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes

module.exports = app
