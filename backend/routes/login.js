import express from 'express'
import passport from 'passport'

const loginRouter = express.Router()

loginRouter.get('/login', async (req, res) => {
  const { user } = req

  if (!user?.username) return res.status(401).send('Unauthorized')

  return res.send(user)
})

loginRouter.get('/oidc', (req, res, next) => {
  if (req.user) {
    // If the user is already logged in, redirect to '/edit'
    res.redirect('/edit')
  } else {
    // If the user is not logged in, proceed with the OIDC authentication
    passport.authenticate('oidc')(req, res, next)
  }
})

loginRouter.get(
  '/callback',
  passport.authenticate('oidc', { failureRedirect: '/' }),
  (_, res) => {
    res.redirect('/edit')
  }
)

loginRouter.get('/logout', async (req, res) => {
  req.session = null
  req.sessionOptions.maxAge = 0
  res.clearCookie('session', { path: '/' })
  res.clearCookie('connect.sid', { path: '/' })
  res.redirect('/')
})

export default loginRouter
