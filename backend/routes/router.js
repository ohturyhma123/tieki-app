import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userMiddleware from '../middleware/user.js'
import loginRouter from './login.js'
import linksRouter from './links.js'
import statementsRouter from './statements.js'
import { inDevelopment, inProduction, inStaging } from '../util/config.js'

dotenv.config()

const router = express()

router.use(express.json())

if (inDevelopment) {
  console.log('Server in development environment')
  router.use(cors())
  if (inDevelopment && !inProduction && !inStaging) {
    console.log('Applying userMiddleware')
    router.use(userMiddleware)
  }
}

router.use('/', loginRouter)
router.use('/links', linksRouter)
router.use('/statements', statementsRouter)

export default router
