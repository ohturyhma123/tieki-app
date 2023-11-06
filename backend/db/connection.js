import mongoose from 'mongoose'
import { MONGODB_TEST_URI } from '../util/config.js'

const connectToDatabase = () => {
  mongoose.connect(MONGODB_TEST_URI)
  const connection = mongoose.connection

  connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
  connection.once('open', () => {
    console.log('Connected to the database')
  })

  return connection
}

export default connectToDatabase
