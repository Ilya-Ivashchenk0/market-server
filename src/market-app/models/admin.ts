import mongoose from 'mongoose'
import {
  emailType,
  passwordType,
  stringType,
} from './mongoTypes'

const adminSchema = new mongoose.Schema({
  role: stringType({ minLength: 2, maxLength: 30 }),
  email: emailType,
  password: passwordType,
  firstName: stringType({ minLength: 2, maxLength: 30 }),
  lastName: stringType({ minLength: 2, maxLength: 30 }),
  surName: stringType({ minLength: 2, maxLength: 30 })
}, {
  timestamps: true
})

export default mongoose.model('admin', adminSchema)