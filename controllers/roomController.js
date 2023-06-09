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
  try {
    // const tempObj = {}
    let roomList = ''

    // query room is avilable
    const notAvilable = await BookingModel.find({
      $or: [
        { range_time: { $eq: req.body.range_time } }
      ],
      date: req.body.date
    })

    // push room to roomList
    for (let i of notAvilable) {
      roomList += i
    }

    const avilable = await RoomModel.find({ room_name: { $ne: roomList.room_selected } })
    res.status(200).json(avilable)
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
