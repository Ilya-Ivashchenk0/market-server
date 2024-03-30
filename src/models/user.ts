import mongoose from 'mongoose'
import { emailType, passwordType, stringType, urlType, phoneType } from './mongoTypes'

const marketSchema = new mongoose.Schema({
  name: stringType({ minLength: 2, maxLength: 30 }),
  description: stringType({ minLength: 32, maxLength: 256 }),
  img: urlType,
  categories: [
    stringType({ minLength: 2, maxLength: 30 })
  ],
  raiting: Number
})

const userSchema = new mongoose.Schema({
  email: emailType,
  password: passwordType,
  firstName: stringType({ minLength: 2, maxLength: 30 }),
  lastName: stringType({ minLength: 2, maxLength: 30 }),
  surName: stringType({ minLength: 2, maxLength: 30 }),
  phone: phoneType,
  market: {
    type: marketSchema,
    default: {}
  }
}, {
  timestamps: true
})

userSchema.index({ email: 1 })

export default mongoose.model('user', userSchema)