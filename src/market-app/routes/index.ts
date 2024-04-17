import express, { Request, Response, NextFunction } from 'express'
import {
  getUsers,
  signUp,
  signIn,
  signOut,
  verification,
  refresh
} from '../controllers/user-controller'
import { ApiError } from '../exceptions/api-error'
import { validateSignup } from '../middlewares/validation'
import auth from '../middlewares/auth'

const router = express.Router()

router.post('/signup', validateSignup, signUp)
router.post('/signin', signIn)

router.delete('/signout', signOut)

router.get('/verification/:link', verification)
router.get('/refresh', refresh)

router.get('/users', auth, getUsers)

router.use((req: Request, res: Response, next: NextFunction) => {
  return next(ApiError.LostRouteError('Запрошен не существующий роут.'))
})


export default router