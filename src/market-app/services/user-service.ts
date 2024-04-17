import User from '../models/user'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import EmailService from './email-service'
import TokenService from './token-service'
import { apiUrl } from '../utils/checkProd'
import { ApiError } from '../exceptions/api-error'
import tokenService from './token-service'
import { JwtPayload } from 'jsonwebtoken'

class UserService {
  async getAllUsers() {
    return await User.find()
  }

  async signup(email: string, password: string) {
    const verifiable = await User.findOne({ email })

    if (verifiable) {
      throw ApiError.BadRequestError(`Пользователь с email - ${email} уже существует!`)
    }

    const hash = await bcrypt.hash(password, 10)
    const verificationLink = uuidv4()
    const user = await User.create({ email, password: hash, verificationLink })
    await EmailService.sendVerificationMail(email, `${apiUrl}/api/verification/${verificationLink}`)
    const userTransferObject = { id: user._id, email: user.email, isActivated: user.isActivated }
    const tokens = TokenService.createTokens({ ...userTransferObject })
    await TokenService.saveToken(userTransferObject.id, tokens.refreshToken)

    return { ...tokens, user: userTransferObject }
  }

  async signin(email: string, password: string) {
    const user = await User.findOne({email}).select('+password')

    if (!user) {
      throw ApiError.BadRequestError('Пользователь с указанными данными не найден!')
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      throw ApiError.BadRequestError('Пользователь с указанными данными не найден!')
    }
    const userTransferObject = { id: user._id, email: user.email, isActivated: user.isActivated }
    const tokens = TokenService.createTokens({ ...userTransferObject })
    await TokenService.saveToken(userTransferObject.id, tokens.refreshToken)

    return { ...tokens, user: userTransferObject }
  }

  async signout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken)
  }

  async activate(verificationLink: string) {
    const user = await User.findOne({ verificationLink })
    if (!user) {
      throw ApiError.IncorrectLinkError('Некоректная ссылка активации')
    }
    user.isActivated = true
    return await user.save()
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const checkRefreshToken = TokenService.validateRefreshToken(refreshToken) as JwtPayload
    const findRefreshToken = await TokenService.findToken(refreshToken)

    if (!checkRefreshToken || !findRefreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const user = await User.findById(checkRefreshToken.id)

    const userTransferObject = { id: user?._id, email: user?.email, isActivated: user?.isActivated }
    const tokens = TokenService.createTokens({ ...userTransferObject })
    return { ...tokens, user: userTransferObject }
  }
}

export default new UserService()