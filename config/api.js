const express = require('express')
const ms = require('ms')
const config = require('../config/config')
const MongoStore = require('connect-mongo')

const app = express()

// json parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// session
const session = require('express-session')
app.set('trust proxy', 1)
app.use(session({
  cookie: {
    maxAge: ms('4h'),
    secure: true,
    httpOnly: true
  },
  resave: false,
  rolling: true,
  secret: config.secretKey,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: config.mongoDB.URI
  })
}))

// routes
// authRoute
const authRoute = require('../routes/authRoute')
app.use('/auth', authRoute)

// roomRoute
const roomRoute = require('../routes/roomRoute')
app.use('/room', roomRoute)

// bookingRoute
const bookingRoute = require('../routes/bookingRoute')
app.use('/booking', bookingRoute)

module.exports = app
