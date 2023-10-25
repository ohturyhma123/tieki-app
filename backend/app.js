import express from 'express'
import path from 'path'
const app = express()
import cors from 'cors'
import linksRouter from './controllers/links.js'
import statementsRouter from './controllers/statements.js'

app.use(cors())
app.use(express.json())

app.use('/api/links', linksRouter)
app.use('/api/statements', statementsRouter)

const DIST_PATH = path.resolve('dist')
const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

app.use(express.static(DIST_PATH))
app.get('*', (_, res) => res.sendFile(INDEX_PATH))

export default app