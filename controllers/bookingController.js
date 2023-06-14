const UserModel = require('../models/userModel')
const RoomModel = require('../models/roomModel')
const BookingModel = require('../models/bookingModel')

// Get all booking
const getAllBooking = async (req, res) => {
  try {
    const allbooking = await BookingModel.find().sort([['date', -1]]) // today
    res.status(200).json(allbooking)
  } catch (error) {
    console.log(`Error in getallbooking : ${error}`)
  }
}

// Create booking
const bookingmtroom = async (req, res) => {
  // * find user_id in UserDB = user_id (pass in session)
  const user = await UserModel.findOne({
    user_id: req.user.user_id
  })

  // use room_selectedID
  // ? if dont have params.roomId
  if (!req?.params?.roomId) {
    return res.status(400).json({
      message: 'ID parameter is required.'
    })
  }
  // * find id room in req.params to booking
  const roomID = await RoomModel.findOne({ _id: req.params.roomId }).exec()
  // ? cant find ID match
  if (!roomID) {
    return res
      .status(204)
      .json({ message: `No Post match ID ${req.params.roomId}.` })
  }

  // * find roomID is discovered in time and range_time ?
  const roomBook = await BookingModel.findOne({
    room_selectedID: roomID._id,
    range_time: req.body.range_time,
    date: req.body.date
  })

  // console.log(roomID)

  try {
    // ? if range_time and time is not find in req.body
    if (!req.body.range_time & !req.body.time) {
      return res.status(400).json({ message: 'incomplete information' })
    }

    // * check if roomBook = null
    if (roomBook === null) {
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
  // * find user_id in UserDB = user_id (pass in session)
  const user = await UserModel.findOne({
    user_id: req.user.user_id
  })

  // ? if dont have params.roomId
  if (!req?.params?.roomId) {
    return res.status(400).json({
      message: 'ID parameter is required.'
    })
  }

  try {
    // * find room_selected in BookingModel is match req.params?
    const booking = await BookingModel.findOne({ room_selectedID: req.params.roomId })
    // ? ckeck if booking.owner is not match user.user_id => user cant delete bc is not your post
    if (booking.owner !== user.user_id) {
      res.status(401).json({ message: 'Its not your post. Cant cancel!' })
    }

    // * delete roomm_selectedID in BookingDB that match req.params.roomId (that room)
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
