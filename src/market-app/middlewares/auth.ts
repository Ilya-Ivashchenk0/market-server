import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api-error'
import tokenService from '../services/token-service'
import { RequestWithUser } from '../types'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const jwtAccsessToken = authHeader.split(' ')[1]

    if (!jwtAccsessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = tokenService.validateAccessToken(jwtAccsessToken)

    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    (req as RequestWithUser).user = userData

    return next()
  } catch (err) {
    return next(ApiError.UnauthorizedError())
  }
}
