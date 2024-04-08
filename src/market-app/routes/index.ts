import express from 'express'
import {
  signUp,
  signIn,
  signOut,
  verification,
  refresh
} from '../controllers/users'


const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)

router.delete('/signout', signOut)

router.get('/verification/:link', verification)
router.get('/refresh', refresh)

router.use(() => {
  throw new Error('Lost route')
})


export default router