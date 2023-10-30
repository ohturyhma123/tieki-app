import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  language: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  iamGroups: {
    type: [String],
    default: [],
  }
})

const User = mongoose.model('User', userSchema)

export default User
