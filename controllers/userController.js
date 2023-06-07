const UserModel = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

// register
const createUser = async (req, res, next) => {
  const { username, email, password, password2, isAdmin } = req.body ?? {}

  try {
    if (!username || !email || !password || !password2 || !isAdmin) {
      return res.status(400).json({ message: 'incomplete information' })
      // .redirect('/auth/register')
    }
    if (password !== password2) {
      return res.status(400).json({ message: 'Your password is not match!' })
      // .redirect('/auth/register')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await UserModel.create({
      user_id: uuidv4().slice(0, 8),
      username: username,
      email: email,
      password: hash,
      password2: hash,
      isAdmin: isAdmin
    })

    req.session.user_id = newUser.user_id
    res.status(200).json(newUser)
    // .redirect('/auth/login')
  } catch (error) {
    console.log('Something error in createUser: ', error)
  }
}

// login
const loginUser = async (req, res) => {
  const { username, password } = req.body ?? {}

  try {
    const user = await UserModel.findOne({ username: username })

    if (user) {
      await bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          req.session.user_id = user.user_id
          console.log(req.session.user_id)
          res.json({
            email: user.email,
            username: user.username
          })
        } else {
          res.status(401).json({ meaasge: 'Password is incorrect' })
        }
      })
    } else {
      res.status(400).json({ message: 'Your username or password is incorrect!' })
    }
  } catch (error) {
    console.log(`Error in login : ${error}`)
  }
}

module.exports = {
  createUser,
  loginUser
}
