const UserModel = require('../models/userSchema')
const bcrypt = require('bcryptjs')

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
      username: username,
      email: email,
      password: hash,
      password2: hash,
      isAdmin: isAdmin
    })

    res.status(200).json(newUser)
    // .redirect('/auth/login')
  } catch (error) {
    console.log('Something error in createUser: ', error)
  }
}

// login
const loginUser = async (req, res, next) => {
  const { username, password } = req.body ?? {}

  try {
    const user = await UserModel.findOne({ username: username })
    if (!user) return res.status(401).json({ message: 'You are not authen' })

    if (user) {
      await bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          req.session.user = user
          console.log(req.session.user)
          res.send({
            id: user.id,
            name: user.name,
            username: user.username
          })
        } else {
          res.status(401).send('Password is incorrect')
        }
      })
    } else {
      res.status(400).json({ message: 'Your username or password is incorrect!' })
    }

    // session
  } catch (error) {

  }
}

module.exports = {
  createUser,
  loginUser
}
