import app from './app.js'
import http from 'http'
import connectToDatabase from './db/connection.js'
import passport from 'passport'
import session from 'express-session'
import dotenv from 'dotenv'
import setupAuthentication from './util/oidc.js'

dotenv.config()
const server = http.createServer(app)

const PORT = 3001

const dbconnection = connectToDatabase()

const SESSION_SECRET = process.env.SESSION_SECRET

app.use(
  session({
    secret: SESSION_SECRET,
  })
)

app.use(passport.initialize())
app.use(passport.session())

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await setupAuthentication()
})

server.on('close', () => {
  dbconnection.close()
  console.log('Database connection closed')
})

process.on('SIGINT', () => {
  console.log('Server is stopping...')
  server.close(() => {
    console.log('Server has stopped.')
    process.exit(0)
  })
})