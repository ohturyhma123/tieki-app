import mongoose from 'mongoose'
import { MONGODB_URI } from '../util/config.js'

/**
Connects to MongoDB database.
@returns connection
*/
const connectToDatabase = async () => {
  if (MONGODB_URI === '<connection_string>' || MONGODB_URI === '') {
    console.log('MONGODB_URI environment variable is not set.')
    process.exit(1)
  }
  mongoose.connect(MONGODB_URI)
  const connection = mongoose.connection

  connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
  connection.once('open', () => {
    console.log('Connected to the database')
  })

  return connection
}

/**
Disconnects to MongoDB database.
*/
const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from the database')
  } catch (error) {
    console.error('Error disconnecting from the database:', error)
  }
}

export { connectToDatabase, disconnectFromDatabase }
