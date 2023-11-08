import express from 'express'
import Statement from '../db/models/StatementModel.js'
import AdminCheck from '../middleware/AdminCheck.js'

const statementsRouter = express()

statementsRouter.get('/', async (req, res) => {
  try {
    const statementsData = await Statement.find()
    res.json(statementsData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

statementsRouter.put('/', AdminCheck, async (req, res) => {
  const updatedStatements = req.body

  try {
    for (const updatedStatement of updatedStatements) {
      const { _id, ...updateData } = updatedStatement
      await Statement.findOneAndUpdate({ _id: _id }, { $set: updateData })
    }
    res.json({ message: 'Statements updated successfully' })
  } catch (error) {
    console.error('Error updating statements:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default statementsRouter
