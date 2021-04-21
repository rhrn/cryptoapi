import { resolve } from 'path'
import { Polly } from '@pollyjs/core'
import { setupPolly } from 'setup-polly-jest'
import FSPersister from '@pollyjs/persister-fs'
import NodeHttpAdapter from '@pollyjs/adapter-node-http'
import { fetchPrices } from './'

const apiBase = process.env.CRYPTOCOMPARE_APIBASE

Polly.register(NodeHttpAdapter)
Polly.register(FSPersister)

const context = setupPolly({
  adapters: ['node-http'],
  persister: 'fs',
  persisterOptions: {
    fs: {
      recordingsDir: resolve(__dirname, '__recordings__')
    }
  }
})

describe('cryptocompare/fetcher', () => {
  beforeEach(() => {
    context.polly.configure({ recordIfMissing: true })
  })

  describe('fetcher', () => {
    it('basic', async () => {
      const prices = await fetchPrices()
      expect(prices.RAW).toBeTruthy()
      expect(prices.DISPLAY).toBeTruthy()
    })
  })

  describe('error handler 500', () => {
    beforeEach(() => {
      context.polly.server.get(apiBase).intercept((res, req) => {
        req.status(500)
      })
    })

    it('basic', async done => {
      try {
        await fetchPrices()
      } catch (e) {
        done()
      }
    })
  })

  describe('json parser error', () => {
    beforeEach(() => {
      context.polly.server.get(apiBase).intercept((res, req) => {
        req.status(200).send('text')
      })
    })

    it('basic', async done => {
      try {
        await fetchPrices()
      } catch {
        done()
      }
    })
  })
})
