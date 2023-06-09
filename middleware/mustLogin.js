const UserModel = require('../models/userModel')

// Check permission
const authSession = async (req, res, next) => {
  // user is not logged in
  if (!req.session.user_id) return res.status(401).json({ message: 'You dont have permission to access1' })

  req.user = await UserModel.findOne({ user_id: req.session.user_id })

  // user does not exist
  if (!req.user) return res.status(401).json({ message: 'You dont have permission to access' })
  next()
}

module.exports = authSession
