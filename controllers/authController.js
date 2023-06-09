const UserModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

// Register
const createUser = async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'incomplete information' })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await UserModel.create({
      user_id: uuidv4().slice(0, 8),
      username: username,
      email: email,
      password: hash,
      isAdmin: isAdmin
    })

    req.session.user_id = newUser.user_id
    res.status(200).json(newUser)
  } catch (error) {
    console.log('Error in createUser: ', error)
  }
}

// Login
const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserModel.findOne({ username: username }).select('+password')

    if (user) {
      await bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          req.session.user_id = user.user_id
          res.status(200).json({
            message: 'Login success!',
            user_id: req.session.user_id,
            email: user.email,
            username: user.username
          })
        } else {
          res.status(401).json({ meaasge: `Password is incorrect (error: ${err})` })
        }
      })
    } else {
      res.status(401).json({ message: 'Your username or password is incorrect!' })
    }
  } catch (error) {
    console.log(`Error in login : ${error}`)
  }
}

module.exports = {
  createUser,
  loginUser
}
