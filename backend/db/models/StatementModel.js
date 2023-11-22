import mongoose from 'mongoose'

const statementSchema = new mongoose.Schema({
  id: Number,
  statement: String,
  value: Number
})

const categorySchema = new mongoose.Schema({
  category: String,
  categoryId: Number,
  boolean: Boolean,
  statements: [statementSchema]
}, {
  collection: 'statements'
})

const Statement = mongoose.model('Statement', categorySchema)

export default Statement
