export const dbUrl = process.env.NODE_ENV !== 'production'
  ? 'mongodb://127.0.0.1:27017/market'
  : process.env.DB_URL

export const jwtToken = process.env.NODE_ENV !== 'production'
  ? 'b0642d70b8b9e5b547d6f01eb2bedda65672fea8f0ec527ce88164e49ab628c5'
  : process.env.JWT_SECRET

export const mailerPort = process.env.NODE_ENV !== 'production'
  ? parseInt('587')
  : parseInt(process.env.SMTP_PORT || '587', 10)

export const apiUrl = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3666'
  : process.env.API_URL

export const clientUrl = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3777'
  : process.env.CLIENT_URL