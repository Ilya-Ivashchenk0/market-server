import { IUser } from './types/UserTypes'

export interface RequestWithUser extends Request {
  user?: Partial<IUser>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
}