import express from 'express'
import linksRouter from './controllers/links.js'
import statementsRouter from './controllers/statements.js'

const app = express()

app.use(express.json())

app.use('/api/links', linksRouter)
app.use('/api/statements', statementsRouter)

export default app