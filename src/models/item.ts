import mongoose from 'mongoose'
import { stringType, urlType } from './mongoTypes'

const itemSchema = new mongoose.Schema({
  userId: stringType({ required: true, ref: 'user' }),
  marketName: stringType({ minLength: 2, maxLength: 30 }),
  title: stringType({ minLength: 2, maxLength: 30 }),
  description: stringType({ minLength: 32, maxLength: 256 }),
  price: Number,
  image: urlType,
  images: [{
    type: urlType,
    default: {}
  }]
}, {
  timestamps: true
})

itemSchema.index({ userId: 1 })

export default mongoose.model('item', itemSchema)