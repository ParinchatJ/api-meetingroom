const mongoose = require('mongoose')
const app = require('./config/api')
const config = require('./config/config')

const appStart = async () => {
  try {
    // connect mongoose
    await mongoose
      .connect(config.mongoDB.URI, {
        useNewUrlParser: true
      })
      .then(() => {
        console.log('MongoDB connect successfully')
      })
      .catch((err) => {
        console.log(`MongoDB is ERROR! : ${err}`)
      })

    // connect port
    await app.listen(config.port, (err) => {
      if (err) {
        return console.log(`ERROR connect PORT : ${err}`)
      }
      console.log(`Listening on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.log(`ERROR! appStart : ${e}`)
  }
}

appStart()
