import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  url: String
}, {
  collection: 'links'
})

const Link = mongoose.model('Link', linkSchema)

export default Link
