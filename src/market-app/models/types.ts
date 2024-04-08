import mongoose, { Document, Types } from 'mongoose'

export interface IStringType {
  minLength: number
  maxLength: number
  required: boolean
  select: boolean
  unique: boolean
  ref: string
}

export interface MIMarket extends Document {
  marketName: string
  description: string
  img?: string
  urlAddress?: string
  categories: string[]
  raiting?: number
  items?: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

export interface MIUser extends Document {
  email: string
  password: string
  isActivated: boolean
  verificationLink: string
  firstName: string
  lastName: string
  surName: string
  phone: string
  market: {
    marketName: string
    description: string
    img?: string
    urlAddress?: string
    categories: string[]
    raiting?: number
    items?: mongoose.Types.ObjectId[]
  }
  createdAt: Date
  updatedAt: Date
}

export interface MIToken extends Document {
  user: Types.ObjectId
  refreshToken: string
  ip: string
  browser: string
}