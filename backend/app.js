import express from 'express'
import cors from 'cors'
import linksRouter from './controllers/links.js'
import statementsRouter from './controllers/statements.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/links', linksRouter)
app.use('/api/statements', statementsRouter)

export default app