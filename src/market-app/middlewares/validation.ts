import { celebrate, Joi } from 'celebrate'

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
})

export {
  validateSignup
}