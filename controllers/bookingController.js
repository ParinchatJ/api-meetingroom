const UserModel = require('../models/userModel')
const RoomModel = require('../models/roomModel')
const BookingModel = require('../models/bookingModel')

// get all
const getAllBooking = async (req, res) => {
  try {
    const allbooking = await BookingModel.find().sort([['date', -1]]) // name sort
    res.status(200).json(allbooking)
  } catch (error) {
    console.log(`Error in getallbooking : ${error}`)
  }
}

// post booking
const bookingmtroom = async (req, res) => {
  const user = await UserModel.findOne({
    user_id: req.user.user_id
  })

  if (!req?.params?.roomId) {
    return res.status(400).json({
      message: 'ID parameter is required.'
    })
  }

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

  const newBooking = await BookingModel.create({
    owner: user.user_id,
    room_selected: roomID.room_name,
    room_selectedID: roomID._id,
    ...req.body
  })

  res.status(200).json(newBooking)
}

// delete
const bookingCancel = async (req, res) => {
  const user = await UserModel.findOne({
    user_id: req.user.user_id
  })

  if (!req?.params?.roomId) {
    return res.status(400).json({
      message: 'ID parameter is required.'
    })
  }

  // delete
  const booking = await BookingModel.findOne({ room_selectedID: req.params.roomId })
  if (booking.owner !== user.user_id) {
    res.status(204).json({ message: 'Its not your post. Cant cancel!' })
  }

  await BookingModel.deleteOne({ room_selectedID: req.params.roomId })
  res.status(200).json({ message: 'Room has been deleted' })
}

module.exports = {
  getAllBooking,
  bookingmtroom,
  bookingCancel
}
