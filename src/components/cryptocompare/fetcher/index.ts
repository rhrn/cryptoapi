import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
import { InputPrices } from '../../../types/index'

dotenv.config()

const apiBase: string = String(process.env.CRYPTOCOMPARE_APIBASE)
const supportedFsyms: string = String(process.env.CRYPTOCOMPARE_FSYMS)
const supportedTsyms: string = String(process.env.CRYPTOCOMPARE_TSYMS)

export const fetchPrices = async (): Promise<InputPrices> => {
  const res = await fetch(`${apiBase}?fsyms=${supportedFsyms}&tsyms=${supportedTsyms}`)

  if (!res.ok) {
    throw new Error('Fetch error')
  }

  return await res.json()
}
