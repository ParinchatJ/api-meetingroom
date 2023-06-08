const express = require('express')
const ms = require('ms')
const config = require('../config/config')
const MongoStore = require('connect-mongo')

const app = express()

// cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.set('trust proxy', 1)

// session
const session = require('express-session')
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
    mongoUrl: config.mongoDB.URI,
    collectionName: 'sessions',
    stringify: false,
    autoRemove: 'native'
  })
}))

// json parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
