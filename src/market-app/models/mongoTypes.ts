import isEmail from 'validator/lib/isEmail'
import { IStringType } from './types'

const emailType = {
  type: String,
  required: true,
  unique: true,
  validate: {
    validator: (v: string) => isEmail(v),
    message: 'Неправильный формат почты'
  }
}

const passwordType = {
  type: String,
  required: true,
  select: false
}

const stringType = (options: Partial<IStringType>) => {
  const string = { type: String }
  return Object.assign(string, options)
}

const urlType = {
  type: String,
  maxLength: 4096,
  trim: true
}

const booleanType = {
  type: Boolean,
  default: false
}

export {
  emailType,
  passwordType,
  stringType,
  urlType,
  booleanType
}