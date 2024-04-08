import rateLimit from 'express-rate-limit'

export default rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час (в миллисекундах)
  max: 3000, // максимальное количество запросов
  message: 'Слишком много запросов с вашего IP, попробуйте позже. Лимит составляет: 3000 запросов, в час.'
})