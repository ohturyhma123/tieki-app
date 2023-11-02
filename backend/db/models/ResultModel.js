import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
  description: String,
  link: String
})

// Main Schema
const resultSchema = new mongoose.Schema({
  category: String,
  id: Number,
  textSegments: [String],
  listPoints: [String],
  links: [linkSchema],
  positive: Boolean
}, {
  collection: 'results'
})

const Result = mongoose.model('Result', resultSchema)

export default Result
