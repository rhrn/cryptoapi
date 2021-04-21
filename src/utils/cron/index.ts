import 'module-alias/register'
import * as dotenv from 'dotenv'
import { logger } from '@src/logger'
import { job as cryptocompareJob } from '@src/components/cryptocompare'

const { CronJob } = require('cron')

dotenv.config()

export const cryptocompare = new CronJob(process.env.CRYPTOCOMPARE_CRON_SCHEDULE, async () => {
  try {
    logger.info({ message: 'cryptocompare job' })
    cryptocompare.stop()
    await cryptocompareJob()
    cryptocompare.start()
  } catch (error) {
    logger.info({ message: 'cryptocompare job failed', error })
    cryptocompare.start()
  }
})

export const start = (): void => {
  cryptocompare.start()
}
