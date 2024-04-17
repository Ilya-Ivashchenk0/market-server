import { Request, Response, NextFunction } from 'express'
import { clientUrl } from '../utils/checkProd'
// import { RequestWithUser } from '../types'
import UserService from '../services/user-service'
import { ApiError } from '../exceptions/api-error'


// export const getUserInfo = (req: RequestWithUser, res: Response, next: NextFunction) => {
//   const userId = (req.user as { _id: string })._id

//   User.findById(userId)
//     .then((user) => {
//       if (!user) {
//         throw new Error('User not found')
//       }
//       return res.status(200).send({ data: user })
//     })
//     .catch(next)
// }

// export const updateUserInfo = (req: RequestWithUser, res: Response, next: NextFunction) => {
//   const { email, name } = req.body

//   User.findByIdAndUpdate(
//     (req.user as { _id: string })._id,
//     { email, name },
//     { new: true, runValidators: true }
//   )
//     .then((user) => res.send({ data: user }))
//     .catch(next)
// }

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return UserService.getAllUsers()
    .then((users) => res.json(users))
    .catch(next)
}

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw ApiError.BadRequestError('Email и пароль обязательны для ввода!')
  }

  return UserService.signup(email, password)
    .then((userData) => {
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 3600000 * 24 * 30,
        httpOnly: true,
        sameSite: true
      })

      return res.json({
        message: 'Вы успешно зарегистрировались!',
        accessToken: userData.accessToken,
        user: userData.user
      })
    })
    .catch(next)
}

export const signIn = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw ApiError.BadRequestError('Email и пароль обязательны для ввода!')
  }

  return UserService.signin(email, password)
    .then((userData) => {
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 3600000 * 24 * 30,
        httpOnly: true,
        sameSite: true
      })

      return res.json({
        message: 'Вход выполнен успешно!',
        accessToken: userData.accessToken,
        user: userData.user
      })
    })
    .catch(next)
}


export const signOut = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies
  return UserService.signout(refreshToken)
    .then(() => res.clearCookie('token').status(200).send({ message: 'Вы вышли из системы!' }))
    .catch(next)
}


export const verification = (req: Request, res: Response, next: NextFunction) => {
  const verificationLink = req.params.link
  UserService.activate(verificationLink)
    .then(() => {
      if (clientUrl)
        return res.redirect(clientUrl)
    })
    .catch(next)
}

export const refresh = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies

  return UserService.refresh(refreshToken)
    .then((userData) => {
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 3600000 * 24 * 30,
        httpOnly: true,
        sameSite: true
      })

      return res.json({
        message: 'Вход выполнен успешно!',
        accessToken: userData.accessToken,
        user: userData.user
      })
    })
    .catch(next)
}