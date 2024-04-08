import { Request } from 'express'
import { jwtToken } from '../utils/checkProd'
import { expressjwt } from 'express-jwt'

const Auth = expressjwt({
  secret: jwtToken as string,
  algorithms: ['HS256'],
  requestProperty: 'user',
  getToken: (req: Request) => {
    return req.cookies.token
  }
})

export default Auth