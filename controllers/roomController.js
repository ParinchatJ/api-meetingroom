const UserModel = require('../models/userModel')
const RoomModel = require('../models/roomModel')
const { v4: uuidv4 } = require('uuid')

// post
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

// get all
const getAllRoom = async (req, res) => {
  try {
    const allRoom = await RoomModel.find().sort([['room_name', 1]]) // name sort
    res.status(200).json(allRoom)
  } catch (error) {
    console.log(`Error in getallroom : ${error}`)
  }
}

// get one
const getRoomById = async (req, res) => {
  try {
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

// get avilable room
// const avilableRoom = async (req, res) => {
//   try {
//     const roomID = await RoomModel.find({ status: { $eq: false } }).exec()
//     if (!roomID) {
//       return res
//         .status(204)
//         .json({ message: 'No room is avilable' })
//     }

//     res.status(200).json(roomID)
//   } catch (error) {
//     console.log(`Error in getroombyid : ${error}`)
//   }
// }
// patch
// delete

// isAdmin = true

module.exports = {
  createRoom,
  getAllRoom,
  getRoomById
}
