import express from 'express'
import Result from '../db/models/ResultModel.js'
import AdminCheck from '../middleware/AdminCheck.js'

const resultsRouter = express()

resultsRouter.get('/', async (req, res) => {
  try {
    const resultsData = await Result.find().sort({ 'id': 1 })
    res.json(resultsData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

resultsRouter.put('/', AdminCheck, async (req, res) => {
  const updatedResults = req.body

  try {
    for (const updatedResult of updatedResults) {
      for (const segment of updatedResult.textSegments) {
        if (segment.length === 0) {
          throw new Error('Segment can not be empty')
        }
      }
      await Result.findOneAndUpdate({ id: updatedResult.id }, updatedResult)
    }
    res.json({ message: 'results updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update results' })
  }
})

export default resultsRouter
