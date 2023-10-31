const mockUser = {
  username: 'testi123',
  isAdmin: true,
  iamGroups: ['grp-tieki']
}

/**
  Use only in development locally
*/
const userMiddleware = (req, _, next) => {
  req.user = mockUser

  return next()
}

export default userMiddleware
