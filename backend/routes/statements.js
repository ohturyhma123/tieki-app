import express from 'express'
import Statement from '../db/models/StatementModel.js'
import bodyParser from 'body-parser'

import statementsData from '../../data/statementsData.json' assert { type: 'json' }

const statementsRouter = express()

statementsRouter.use(bodyParser.json())


statementsRouter.get('/', async (req, res) => {
  try {
    const statementsData = await Statement.find()
    res.json(statementsData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

statementsRouter.put('/', (req, res) => {
  try {
    const updatedStatements = req.body
    updatedStatements.forEach((updatedStatement) => {
      const index = statementsData.findIndex((statement) => statement.id === updatedStatement.id)
      if (index !== -1) {
        statementsData[index] = { ...statementsData[index], ...updatedStatement }
      }
    })
    res.json({ message: 'Statements updated successfully', data: statementsData })
  } catch (error) {
    console.error('Error updating statements:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default statementsRouter
