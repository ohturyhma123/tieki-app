import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
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