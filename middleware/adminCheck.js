const isAdminCheck = async (req, res, next) => {
  if (!req.session.isAdmin) return res.status(401).json({ message: 'You dont have permission to access (not admin)' })
  next()
}

module.exports = isAdminCheck
