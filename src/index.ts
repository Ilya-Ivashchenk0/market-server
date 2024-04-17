import env from 'dotenv'
env.config()
import marketApp from './market-app'

const PORT = process.env.MARKET_PORT || 3666

const build = () => {
  marketApp.listen(PORT, () => console.log(`\x1b[96;5m🚀 Server started && listening on port:\x1b[0m \x1b[95;4m${PORT}\x1b[0m`))

}

build()
