import express from 'express'
import loginRouter from './login.js'
import linksRouter from './links.js'
import statementsRouter from './statements.js'
import resultsRouter from './results.js'

const router = express()

router.use(express.json())

router.use('/', loginRouter)
router.use('/links', linksRouter)
router.use('/statements', statementsRouter)
router.use('/results', resultsRouter)

export default router
