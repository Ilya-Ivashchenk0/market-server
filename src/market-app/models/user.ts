import mongoose from 'mongoose'
import {
  booleanType,
  emailType,
  passwordType,
  stringType,
  urlType
} from './mongoTypes'
import { MIUser, MIMarket } from './types'

const marketSchema = new mongoose.Schema<MIMarket>({
  marketName: stringType({ minLength: 2, maxLength: 30 }),
  description: stringType({ minLength: 32, maxLength: 3000 }),
  img: urlType,
  urlAddress: urlType,
  categories: [
    stringType({ minLength: 2, maxLength: 30 })
  ],
  raiting: Number,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item'
  }]
}, {
  timestamps: { createdAt: true }
})

const userSchema = new mongoose.Schema<MIUser>({
  email: emailType,
  password: passwordType,
  isActivated: booleanType,
  verificationLink: String,
  firstName: stringType({ minLength: 2, maxLength: 30 }),
  lastName: stringType({ minLength: 2, maxLength: 30 }),
  surName: stringType({ minLength: 2, maxLength: 30 }),
  market: {
    type: marketSchema,
    default: {}
  }
}, {
  timestamps: true
})

userSchema.index({ email: 1 })

export default mongoose.model<MIUser>('User', userSchema)