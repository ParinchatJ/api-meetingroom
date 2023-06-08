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
  }
})

module.exports = new mongoose.model('createRoom', roomSchema)
