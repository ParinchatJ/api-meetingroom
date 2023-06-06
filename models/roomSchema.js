const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  owner_created: {
    type: String,
    required: true
  },
  room_name: {
    type: String,
    required: true
  },
  max_capacity: {
    type: Number,
    required: true
  },
  unavailableDates: { type: [Date] }
},
{ timestamps: true }
)

module.exports = new mongoose.model('createRoom', roomSchema)
