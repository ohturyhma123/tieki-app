import express from 'express'
import cors from 'cors'
import userMiddleware from '../middleware/user.js'
import loginRouter from './login.js'
import linksRouter from './links.js'
import statementsRouter from './statements.js'
import { inDevelopment, inStaging, inTestMode } from '../util/config.js'
import resultsRouter from './results.js'

const router = express()

router.use(express.json())

if (inDevelopment || inTestMode) {
  router.use(cors())
  if (!inStaging) {
    router.use(userMiddleware)
    console.log('Applying userMiddleware')
  }
}

router.use('/', loginRouter)
router.use('/links', linksRouter)
router.use('/statements', statementsRouter)
router.use('/results', resultsRouter)

export default router
