import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cors from 'cors'
import path from 'path'
import { inDevelopment, inProduction, inStaging, inTestMode, SESSION_SECRET } from './util/config.js'
import router from './routes/router.js'
import userMiddleware from './middleware/user.js'
import store from './util/mongostore.js'

const app = express()

app.use(express.json())

if (inDevelopment || inTestMode) {
  app.use(cors())
  if (!inStaging) {
    app.use(userMiddleware)
    console.log('Applying userMiddleware')
  }
}

const sessionConfig = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}

if (inProduction) {
  sessionConfig.store = store
} else {
  sessionConfig.cookie = { maxAge: 8 * 60 * 60 * 1000, }
}

app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', (req, res, next) => router(req, res, next))
app.use('/api', (_, res) => res.sendStatus(404))

if (inProduction) {
  const DIST_PATH = path.resolve('dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (_, res) => res.sendFile(INDEX_PATH))
}

export default app
