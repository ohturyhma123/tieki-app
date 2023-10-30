import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { SESSION_SECRET } from './util/config.js'
import router from './routes/router.js'
import connectToDatabase from './db/connection.js'
import setupAuthentication from './util/oidc.js'

const PORT = 3001
const app = express()

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

app.listen(PORT, async () => {
  await connectToDatabase()
  await setupAuthentication()
  console.log(`Server running on port ${PORT}`)
})
