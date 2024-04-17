import { Request } from 'express'

export interface RequestWithUser extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
}
