const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  owner: {
    type: String
  },
  room_selected: {
    type: String
  },
  room_selectedID: {
    type: String
  },
  range_time: {
    type: Number,
    enum: {
      values: [0, 1, 2, 3, 4, 5, 6, 7]
    },
    required: true
  },
  date: {
    type: Date,
    require: true
  }
})

module.exports = new mongoose.model('booking', bookingSchema)
