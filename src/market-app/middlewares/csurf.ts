import csurf from 'csurf'

const csrfProtection = csurf({ // Настройка middleware для защиты от CSRF-атак
  cookie: {
    key: '_csrf',
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
})

export default csrfProtection
