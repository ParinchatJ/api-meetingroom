const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  room_selected: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
})

module.exports = new mongoose.model('booking', bookingSchema)
