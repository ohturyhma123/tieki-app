import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

const url = process.env.MONGODB_URI

const connectToDatabase = () => {
  mongoose.connect(url)
  const connection = mongoose.connection

  connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
  connection.once('open', () => {
    console.log('Connected to the database')
  })

  return connection
}

export default connectToDatabase
