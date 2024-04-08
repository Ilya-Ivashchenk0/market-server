import env from 'dotenv'
env.config()
import './middlewares/db'
import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from './middlewares/helmet'
import rateLimit from './middlewares/rateLimit'
import cors from './middlewares/cors'
// import csrfProtection from './middlewares/csurf'
import router from './routes'
import centralErrors from './middlewares/central-errors'

const marketApp = express()

marketApp.use(cookieParser())
marketApp.use(express.json())
marketApp.use(express.urlencoded({ extended: true }))
// marketApp.use(csrfProtection)
marketApp.use(helmet)
marketApp.use(rateLimit)
marketApp.use(cors)

marketApp.use('/api', router)




marketApp.use(centralErrors)

export default marketApp