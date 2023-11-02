import express from 'express'
import Result from '../db/models/ResultModel.js'

const resultsRouter = express()

resultsRouter.get('/', async (req, res) => {
  try {
    const resultsData = await Result.find()
    res.json(resultsData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

export default resultsRouter
