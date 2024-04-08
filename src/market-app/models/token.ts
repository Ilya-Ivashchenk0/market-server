import mongoose, { Schema } from 'mongoose'
import { MIToken } from './types'

const tokenSchema = new mongoose.Schema<MIToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  refreshToken: {
    type: String,
    required: true
  },
  ip: String,
  browser: String
})

export default mongoose.model<MIToken>('Token', tokenSchema)