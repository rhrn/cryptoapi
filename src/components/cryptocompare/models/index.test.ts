import { PrismaClient } from '@prisma/client'

import { InputPrices } from '../../../types/index'

import { addPrices, getPrices } from './index'

import apiData from './__mocks__/api-data.json'

const prisma = new PrismaClient({
  // log: [ "info", "query" ]
})

describe('cryptocompare/models', () => {
  beforeAll(async () => {
    await prisma.cryptocomparePrice.deleteMany()
  })

  describe('addPrices', () => {
    let last: any

    it('basic', async () => {
      const result = await addPrices(apiData)
      expect(result[0]).toHaveLength(5)
      expect(result[0][0].id).toBeTruthy()
      expect(result[0][0].fsym).toBeTruthy()
      expect(result[0][0].tsym).toBeTruthy()
      expect(result[0][0].raw).toBeTruthy()
      expect(result[0][0].display).toBeTruthy()

      last = result[0]
    })

    it('update', async () => {
      const result = await addPrices(apiData)
      const a = result[0].map(({ tsym, fsym, display, raw }: { tsym: any, fsym: any, display: any, raw: any }) => ({ tsym, fsym, display, raw }))
      const b = last.map(({ tsym, fsym, display, raw }: any) => ({ tsym, fsym, display, raw }))
      expect(a).toEqual(b)
    })
  })

  describe('getPrices', () => {
    it('basic', async () => {
      const result: InputPrices = await getPrices({ fsyms: ['BTC', 'ETH'], tsyms: ['USD', 'RUR'] })

      expect(result.RAW.BTC.USD).toEqual(apiData.RAW.BTC.USD)
      expect(result.RAW.BTC.RUR).toEqual(apiData.RAW.BTC.RUR)
      expect(result.RAW.ETH.RUR).toEqual(apiData.RAW.ETH.RUR)
      expect(result.RAW.ETH.USD).toEqual(apiData.RAW.ETH.USD)
    })
  })
})
