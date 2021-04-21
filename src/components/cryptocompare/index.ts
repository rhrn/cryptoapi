import { TextDecoder } from 'util'
import { parse as parseQuery } from 'querystring'
import { SHARED_COMPRESSOR, HttpRequest, HttpResponse, WebSocket } from 'uWebSockets.js'

import { GetPricesOptions } from '@src/types/index'
import { InternalServerError, NotFoundError } from '@src/errors/index'

import { fetchPrices } from './fetcher/index'
import { getPrices } from './controllers/index'
import { addPrices } from './models'

const decoder = new TextDecoder('utf-8')

const asJSON = JSON.parse
const asString = JSON.stringify

const getTextFromBufferArray = (bufferArray: ArrayBuffer): string => {
  if (!bufferArray || (bufferArray && bufferArray.byteLength === 0)) {
    return ''
  }
  return decoder.decode(bufferArray)
}

export const ws = {

  idleTimeout: 60000,
  maxBackpressure: 1024,
  maxPayloadLength: 512,
  compression: SHARED_COMPRESSOR,

  message: async (ws: WebSocket, message: ArrayBuffer, isBinary: boolean) => {
    try {
      const text = getTextFromBufferArray(message)
      const json = asJSON(text)

      let data
      let error = null

      switch (json.message) {
        case 'price':
        case 'prices':
          ({ data, error } = await getPrices(json))
          break
        default:
          error = new NotFoundError()
      }

      if (error) {
        throw error
      }

      ws.send(asString({ message: json.message, data }))
    } catch (error) {
      ws.send(asString({ message: 'error', error: error.payload }))
    }
  }
}

export const httpGet = async (res: HttpResponse, req: HttpRequest): Promise<any> => {
  res.onAborted(() => {
    res.aborted = true
  })

  try {
    const { fsyms, tsyms }: { fsyms: string, tsyms: string } = parseQuery(req.getQuery()) as any

    const prices: GetPricesOptions = {
      fsyms: fsyms ? fsyms.split(',') : [],
      tsyms: tsyms ? tsyms.split(',') : []
    }

    const { data, error } = await getPrices(prices)

    if (error) {
      throw error
    }

    if (!res.aborted) {
      res.end(asString(data))
    }
  } catch (error: any) {
    if (!res.aborted) {
      if (error.type === 'CustomError') {
        return res.writeStatus(error.statusCode).end(asString({ error: error.payload }))
      }

      const { statusCode, payload } = new InternalServerError()

      res.writeStatus(statusCode).end(asString({ error: payload }))
    }
  }
}

export const job = async (): Promise<any> => {
  const data = await fetchPrices()
  return await addPrices(data)
}
