const mockUser = {
  id: 'hy-hlo-123456789',
  username: 'testi123',
  email: 'aaaa@helsinki.fi',
  language: 'fi',
  isAdmin: true,
  iamGroups: ['grp-tieki', 'hy-employees'],
}

/**
  Use only in development locally
*/
const userMiddleware = (req, _, next) => {
  req.user = mockUser

  return next()
}

export default userMiddleware
