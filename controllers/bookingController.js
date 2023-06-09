const UserModel = require('../models/userModel')
const RoomModel = require('../models/roomModel')
const BookingModel = require('../models/bookingModel')

// Get all booking
const getAllBooking = async (req, res) => {
  try {
    const allbooking = await BookingModel.find().sort([['date', -1]]) // name sort
    res.status(200).json(allbooking)
  } catch (error) {
    console.log(`Error in getallbooking : ${error}`)
  }
}

// Create booking
const bookingmtroom = async (req, res) => {
  const user = await UserModel.findOne({
    user_id: req.user.user_id
  })

  const booking = await BookingModel.find({
    range_time: req.body.range_time,
    date: req.body.date
  })

  // use room_selectedID
  if (!req?.params?.roomId) {
    return res.status(400).json({
      message: 'ID parameter is required.'
    })
  }

  try {
    // find id room to booking
    const roomID = await RoomModel.findOne({ _id: req.params.roomId }).exec()
    // cant find ID match
    if (!roomID) {
      return res
        .status(204)
        .json({ message: `No Post match ID ${req.params.roomId}.` })
    }

    // booking
    if (!req.body.range_time) {
      return res.status(400).json({ message: 'incomplete information' })
    }

    // check date and time is not equal
    if (Object.keys(booking).length === 0) {
      const newBooking = await BookingModel.create({
        owner: user.user_id,
        room_selected: roomID.room_name,
        room_selectedID: roomID._id,
        ...req.body
      })
      res.status(200).json(newBooking)
    } else {
      return res.status(400).json({ message: 'This room in time is Unavilable! pls booking another room' })
    }
  } catch (error) {
    console.log(`Error in create booking : ${error}`)
  }
}

// Cancel booking
const bookingCancel = async (req, res) => {
  const user = await UserModel.findOne({
    user_id: req.user.user_id
  })

  // use room_selectedID
  if (!req?.params?.roomId) {
    return res.status(400).json({
      message: 'ID parameter is required.'
    })
  }

  try {
    // delete
    const booking = await BookingModel.findOne({ room_selectedID: req.params.roomId })
    if (booking.owner !== user.user_id) {
      res.status(401).json({ message: 'Its not your post. Cant cancel!' })
    }

    await BookingModel.deleteOne({ room_selectedID: req.params.roomId })
    res.status(200).json({ message: 'Room has been deleted' })
  } catch (error) {
    console.log(`Error in cancel booking : ${error}`)
  }
}

module.exports = {
  getAllBooking,
  bookingmtroom,
  bookingCancel
}
