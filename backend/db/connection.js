import mongoose from 'mongoose'
import { MONGODB_TEST_URI, MONGODB_URI } from '../util/config.js'

const connectToDatabase = () => {
  const uri = process.env.NODE_ENV === 'test' ? MONGODB_TEST_URI : MONGODB_URI

  mongoose.connect(uri)
  const connection = mongoose.connection

  connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
  connection.once('open', () => {
    console.log('Connected to the database')
  })

  return connection
}

export default connectToDatabase
