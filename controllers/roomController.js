const UserModel = require('../models/userModel')
const RoomModel = require('../models/roomModel')
const BookingModel = require('../models/bookingModel')
const { v4: uuidv4 } = require('uuid')

// Post new room
const createRoom = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      user_id: req.user.user_id
    })

    if (!req.body.room_name || !req.body.max_capacity) {
      return res.status(400).json({ message: 'incomplete information' })
    }

    const newRoom = await RoomModel.create({
      room_id: uuidv4().slice(0, 8),
      owner_created: user.user_id,
      unavailableDates: [],
      ...req.body
    })

    res.status(200).json(newRoom)
  } catch (error) {
    console.log(`Something error in createroom : ${error}`)
  }
}

// Get all room
const getAllRoom = async (req, res) => {
  try {
    const allRoom = await RoomModel.find().sort([['room_name', 1]]) // name sort
    res.status(200).json(allRoom)
  } catch (error) {
    console.log(`Error in getallroom : ${error}`)
  }
}

// Get one room by ID
const getRoomById = async (req, res) => {
  try {
    // use _id
    if (!req?.params?.id) {
      return res.status(400).json({
        message: 'ID parameter is required.'
      })
    }

    const roomID = await RoomModel.findOne({ _id: req.params.id }).exec()
    // cant find ID match
    if (!roomID) {
      return res
        .status(204)
        .json({ message: `No Post match ID ${req.params.id}.` })
    }
    res.status(200).json(roomID)
  } catch (error) {
    console.log(`Error in getroombyid : ${error}`)
  }
}

// Get avilable room
const avilableRoom = async (req, res) => {
  // * find range_time and time in BookingDB match req.body => Are the range_time + time being create?
  const booking = await BookingModel.find({
    range_time: req.body.range_time,
    date: req.body.date
  }).sort([['room_selected', 1]])

  const findAllRoom = await RoomModel.find().sort([['room_name', 1]])

  // ? if range_time and time is not find in req.body
  if (!req.body.range_time && !req.body.time) {
    return res.status(400).json({ message: 'incomplete information' })
  }

  // * convert object to array
  const bookingCheck = []
  const roomCheck = []

  booking.forEach(book => {
    bookingCheck.push(book.room_selected)
  })

  findAllRoom.forEach(room => {
    roomCheck.push(room.room_name)
  })

  try {
    // ! Check total room is avalible
    // * check if booking is not match time and range_time => every room is avilable
    if (Object.keys(booking).length === 0) {
      res.status(200).json({ ...roomCheck })
    // * every room is unavilable
    } else {
      // ! Check have some room is avalible
      let checkunavalibleRoom = ''

      // ! Check dont have room is avalible
      if (roomCheck.length === bookingCheck.length) {
        for (let i = 0; i < roomCheck.length; i++) {
          if (roomCheck[i] !== bookingCheck[i]) checkunavalibleRoom += 'false'
        }
        checkunavalibleRoom += 'true'
      } else {
        checkunavalibleRoom += 'false'
      }

      // * Check diffrence room -> find SOME room is avalible
      const differenceRoomCheck = roomCheck.filter(x => !bookingCheck.includes(x))

      if (checkunavalibleRoom === 'true') {
        res.status(200).json({ message: 'All room is UNAVALIBLE ' })
      }
      res.status(200).json({ ...differenceRoomCheck })
    }
  } catch (error) {
    console.log(`Error in avilableRoom : ${error}`)
  }
}

module.exports = {
  createRoom,
  getAllRoom,
  avilableRoom,
  getRoomById
}
