const UserModel = require('../models/userModel')
const RoomModel = require('../models/roomModel')

// post
const createRoom = async (req, res) => {
  const user = await UserModel.findOne({
    user_id: req.user.user_id
  })

  const newRoom = await RoomModel.create({
    owner_created: user.user_id,
    unavailableDates: [],
    ...req.body
  })

  res.status(200).json(newRoom)
}

// get one
// get all
// patch
// delete

// isAdmin = true

module.exports = {
  createRoom
}
