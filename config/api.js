const express = require('express')
const ms = require('ms')
const config = require('../config/config')

const app = express()

// Cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.set('trust proxy', 1)

// Session
const session = require('express-session')
const MongoStore = require('connect-mongo')
app.use(session({
  resave: false,
  secret: config.secretKey,
  saveUninitialized: true,
  cookie: {
    maxAge: ms('4h'),
    secure: false,
    httpOnly: true
  },
  store: MongoStore.create({
    mongoUrl: config.mongoDB.URI
  })
}))

// Json parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
// AuthRoute
const authRoute = require('../routes/authRoute')
app.use('/auth', authRoute)

// RoomRoute
const roomRoute = require('../routes/roomRoute')
app.use('/room', roomRoute)

// BookingRoute
const bookingRoute = require('../routes/bookingRoute')
app.use('/booking', bookingRoute)

module.exports = app
