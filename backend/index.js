import app from './app.js'
import http from 'http'
import connectToDatabase from './db/connection.js'
const server = http.createServer(app)

const PORT = 3001

const dbconnection = connectToDatabase()

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
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