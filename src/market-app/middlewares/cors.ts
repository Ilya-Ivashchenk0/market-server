import cors from 'cors'

const Cors = () => {
  if (process.env.NODE_ENV !== 'production') {
    return {
      origin: ['http://localhost:3000'], // разрешенные домены
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // разрешенные методы
      credentials: true
    }
  }

  return {
    origin: ['https://market.site'], // разрешенные домены
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // разрешенные методы
    credentials: true
  }
}

export default cors(Cors())