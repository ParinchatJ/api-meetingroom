const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  owner_created: {
    type: String
  },
  room_name: {
    type: String,
    required: true
  },
  max_capacity: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean
  },
  meeting_booking: [{ range_time: Number, unavailableDates: { type: [Date] } }]
},
{ timestamps: true }
)

module.exports = new mongoose.model('createRoom', roomSchema)
