import app from './app.js'
import { connectToDatabase, disconnectFromDatabase } from './db/connection.js'
import { PORT } from './util/config.js'
import setupAuthentication from './util/oidc.js'

// Start the server
app.listen(PORT, async () => {
  await connectToDatabase()
  await setupAuthentication()
  console.log(`Server running on port ${PORT}`)
})

// Handle server termination gracefully
const handleTermination = async () => {
  await disconnectFromDatabase()
  console.log('Server has been stopped')
  process.exit(0)
}

process.on('SIGINT', () => handleTermination('SIGINT'))
process.on('SIGTERM', () => handleTermination('SIGTERM'))
process.on('exit', () => handleTermination('exit'))
