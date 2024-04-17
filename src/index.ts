import env from 'dotenv'
env.config()
import marketApp from './market-app'

const PORT = process.env.MARKET_PORT || 3666

const build = () => {
  marketApp.listen(PORT, () => console.log(`\x1b[95mServer started && listening on port 🚀:\x1b[0m\x1b[94m ${PORT}\x1b[0m`))

}

build()
