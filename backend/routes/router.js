import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userMiddleware from '../middleware/user.js'
import loginRouter from './login.js'
import linksRouter from './links.js'
import statementsRouter from './statements.js'

dotenv.config()

const router = express()

router.use(express.json())

if (process.env.NODE_ENV === 'development') {
  router.use(cors())
  router.use(userMiddleware)
}

router.use('/', loginRouter)
router.use('/links', linksRouter)
router.use('/statements', statementsRouter)

export default router
