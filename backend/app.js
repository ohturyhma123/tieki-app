import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cors from 'cors'
import { inDevelopment, inStaging, inTestMode, SESSION_SECRET } from './util/config.js'
import router from './routes/router.js'
import userMiddleware from './middleware/user.js'

const app = express()

app.use(express.json())

if (inDevelopment || inTestMode) {
  app.use(cors())
  if (!inStaging) {
    app.use(userMiddleware)
    console.log('Applying userMiddleware')
  }
}

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

export default app
