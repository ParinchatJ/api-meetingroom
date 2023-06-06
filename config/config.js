require('dotenv').config()

const config = {
  port: process.env.PORT || 3003,
  mongoDB: {
    URI: process.env.MONGO_URI
  }
}

module.exports = config
