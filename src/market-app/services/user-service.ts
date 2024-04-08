import User from '../models/user'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import EmailService from './email-service'
import TokenService from './token-service'
import { apiUrl } from '../utils/checkProd'
import ApiError from '../exceptions/api-error'

class UserService {
  async signup(email: string, password: string) {
    const verifiable = await User.findOne({ email })

    if (verifiable) {
      throw ApiError.BadRequestError(`Пользователь с таким ${email} уже существует!`)
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

  async activate(verificationLink: string) {
    const user = await User.findOne({ verificationLink })
    if (!user) {
      throw new Error('Некоректная ссылка активации')
    }
    user.isActivated = true
    return await user.save()
  }
}

export default new UserService()