import mongoose from 'mongoose'
import { dbUrl } from '../utils/checkProd'


if (!dbUrl) {
  throw new Error('DB_URL is not defined in environment variables')
}

mongoose.connect(dbUrl)
mongoose.connection.on('connected', () => console.log('\x1b[93;2mMongoDB is connected to the server.\x1b[0m'))
mongoose.connection.on('error', (err) => console.error('\x1b[91mMongoDB connection error:\x1b[0m', err))