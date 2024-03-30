import env from 'dotenv'
env.config()
import './middlewares/db'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from './middlewares/helmet'
import rateLimit from './middlewares/rateLimit'
import cors from './middlewares/cors'

const PORT = process.env.PORT || 3666

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet)
app.use(rateLimit)
app.use(cors)

app.get('/', (req: Request, res: Response) => {res.send('Привет, мир!')})

app.listen(PORT, () => console.log(`\x1b[95mServer started && listening on port:\x1b[0m\x1b[94m ${PORT}\x1b[0m`))
