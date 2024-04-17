import { isCelebrateError } from 'celebrate'
import { ApiError } from '../exceptions/api-error'
import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (isCelebrateError(err)) {
    return res.status(400).json({ message: err.details.get('body')?.details.map((detail) => detail.message) })
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Пользователь с указанным _id не найден.' })
  }

  return res.status(500).json({message: 'На сервере произошла ошибка.'})
}