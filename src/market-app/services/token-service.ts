import jwt from 'jsonwebtoken'
import { jwtToken } from '../utils/checkProd'
import Token from '../models/token'

class TokenService {
  createTokens(payload: object) {
    if (!jwtToken) {
      throw new Error('JWT token is not defined')
    }

    const accessToken = jwt.sign(
      payload,
      jwtToken,
      { expiresIn: '30m' } // короткое время жизни для access token
    )

    const refreshToken = jwt.sign(
      payload,
      jwtToken,
      { expiresIn: '30d' } // долгое время жизни для refresh token
    )

    return { accessToken, refreshToken }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await Token.create({ user: userId, refreshToken })
    return token
  }
}

export default new TokenService()