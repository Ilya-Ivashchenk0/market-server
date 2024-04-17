import jwt from 'jsonwebtoken'
import { jwtAccsessToken, jwtRefreshToken } from '../utils/checkProd'
import Token from '../models/token'

class TokenService {
  createTokens(payload: object) {
    if (!jwtAccsessToken || !jwtRefreshToken) {
      throw new Error('JWT token is not defined')
    }

    const accessToken = jwt.sign(
      payload,
      jwtAccsessToken,
      { expiresIn: '30m' } // время жизни для access token
    )

    const refreshToken = jwt.sign(
      payload,
      jwtRefreshToken,
      { expiresIn: '30d' } // время жизни для refresh token
    )

    return { accessToken, refreshToken }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    return await Token.create({ user: userId, refreshToken })
  }

  async removeToken(refreshToken: string) {
    return await Token.deleteOne({ refreshToken })
  }

  validateAccessToken(token: string) {
    try {
      if (jwtAccsessToken)
        return jwt.verify(token, jwtAccsessToken)
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      if (jwtRefreshToken)
        return jwt.verify(token, jwtRefreshToken)
    } catch (e) {
      return null
    }
  }

  async findToken(refreshToken: string) {
    return await Token.findOne({ refreshToken })
  }
}

export default new TokenService()