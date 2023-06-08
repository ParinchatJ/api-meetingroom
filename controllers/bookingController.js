const UserModel = require('../models/userModel')
const RoomModel = require('../models/roomModel')
const BookingModel = require('../models/bookingModel')

// post
const createMeeting = async (req, res) => {
  try {
    // const user = await UserModel.findOne({
    //   user_id: req.user.user_id
    // })

    console.log(req.session.user_id)

    const newMeeting = await BookingModel.create({
      // owner: user.user_id,
      ...req.body
    })

    // meeting_booking: [{ range_time: Number, unavailableDates: { type: [Date] }}] -> array obj
    // เอาเข้าไปใน room ด้วยว่าเวลานั้นไม่ว่าง

    res.status(200).json(newMeeting)
  } catch (error) {
    console.log(`Error in createmeeting : ${error}`)
  }
}

// get all
// get one

// patch
// delete

module.exports = {
  createMeeting
}
