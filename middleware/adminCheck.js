const UserModel = require('../models/userModel')

// Check permission admin
const isAdminCheck = async (req, res, next) => {
  const user = await UserModel.findOne({
    user_id: req.user.user_id
  })
  if (user.isAdmin === false) return res.status(401).json({ message: 'You dont have permission to access (not admin)' })
  next()
}

module.exports = isAdminCheck
