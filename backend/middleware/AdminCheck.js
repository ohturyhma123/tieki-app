const AdminCheck = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next() // Allow the user to proceed if admin
  } else {
    return res.status(403).send('Forbidden')
  }
}

export default AdminCheck
