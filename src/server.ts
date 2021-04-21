import 'module-alias/register'
import * as dotenv from 'dotenv'
import { logger } from '@src/logger'
import { us_socket_context_t } from 'uWebSockets.js'
import { app } from './app'
import { start as cronStart } from '@src/utils/cron'

dotenv.config()

const port = Number(process.env.PORT) || 3000

const cronEnabled = process.env.CRON_ENABLED === 'true'

if (cronEnabled) {
  cronStart()
}

app.listen(port, (socket: us_socket_context_t) => {
  if (socket) {
    logger.info({ message: `Listening to port ${port}` })
  }
})
