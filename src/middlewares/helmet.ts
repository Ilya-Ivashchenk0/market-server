import helmet from 'helmet'

export default helmet({
  contentSecurityPolicy: false,
  frameguard: false,
  referrerPolicy: false,
  hidePoweredBy: true,
  xssFilter: true,
  noSniff: true
})