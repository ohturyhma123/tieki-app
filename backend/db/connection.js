import mongoose from 'mongoose'
import { MONGODB_TEST_URI, MONGODB_URI, inTestMode } from '../util/config.js'

const connectToDatabase = async () => {
  const uri = inTestMode ? MONGODB_TEST_URI : MONGODB_URI

  mongoose.connect(uri)
  const connection = mongoose.connection

  connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
  connection.once('open', () => {
    console.log('Connected to the database')
  })

  return connection
}

const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from the database')
  } catch (error) {
    console.error('Error disconnecting from the database:', error)
  }
}

export { connectToDatabase, disconnectFromDatabase }
