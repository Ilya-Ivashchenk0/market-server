import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import { clientUrl, jwtToken } from '../utils/checkProd'
// import { RequestWithUser } from '../types'
import UserService from '../services/user-service'


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

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  return UserService.signup(email, password)
    .then((userData) => {
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 3600000 * 24 * 30,
        httpOnly: true,
        sameSite: true
      })
      return res.json(userData)
    })
    .catch(next)
}

export const signIn = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('User not found')
      }

      return bcrypt.compare(password, user.password)
        .then((check) => {
          if (!check) {
            throw new Error('Invalid password')
          }

          if (!jwtToken) {
            throw new Error('JWT token is not defined')
          }

          const accessToken = jwt.sign(
            { _id: user._id },
            jwtToken,
            { expiresIn: '30m' } // короткое время жизни для access token
          )

          const refreshToken = jwt.sign(
            { _id: user._id },
            jwtToken,
            { expiresIn: '30d' } // долгое время жизни для refresh token
          )

          // user.refreshToken = refreshToken
          user.save().catch(next)

          // сохраняем refreshToken в куках
          res.cookie('token', refreshToken, {
            maxAge: 3600000 * 24 * 30,
            httpOnly: true,
            sameSite: true
          })

          return res.status(200).send({ accessToken })
        })
        .catch(next)
    })
    .catch(next)
}


export const signOut = (req: Request, res: Response) =>
  res.clearCookie('token').status(200).send({ message: 'Logout successful' })

export const verification = (req: Request, res: Response, next: NextFunction) => {
  const verificationLink = req.params.link
  UserService.activate(verificationLink)
    .then(() => {
      if (clientUrl)
      return res.redirect(clientUrl)
    })
    .catch(next)
}

export const refresh = (req: Request, res: Response) => {
  res.status(200).send( 'accessToken' )
}