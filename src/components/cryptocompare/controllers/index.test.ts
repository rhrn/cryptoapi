import { getPrices } from './'
import { getPrices as getPricesModel } from '../models'
import { SymbolsQueryValidator } from '../validators'

jest.mock('../models')
jest.mock('../validators')

describe('cryptocompare/controllers', () => {
  describe('getPrices', () => {
    it('success', async () => {
      // @ts-ignore
      SymbolsQueryValidator.mockImplementationOnce(() => true)
      // @ts-ignore
      getPricesModel.mockImplementationOnce(() => 'success')
      const result = await getPrices({ fsyms: [], tsyms: [] })

      expect(result.error).toBeNull()
      expect(result.data).toEqual('success')
    })

    it('validation error', async () => {
      // @ts-ignore
      SymbolsQueryValidator.mockImplementationOnce(() => false)
      const result = await getPrices({ fsyms: [], tsyms: [] })

      expect(result.data).toBeUndefined()
      expect(result.error).toBeTruthy()

      // @ts-ignore
      expect(result.error.statusCode).toEqual('400')
    })

    it('throw error / internal error', async () => {
      // @ts-ignore
      SymbolsQueryValidator.mockImplementationOnce(() => true)
      // @ts-ignore
      getPricesModel.mockImplementationOnce(() => {
        throw new Error()
      })

      const result = await getPrices({ fsyms: [], tsyms: [] })

      expect(result.data).toBeUndefined()
      expect(result.error).toBeTruthy()

      // @ts-ignore
      expect(result.error.statusCode).toEqual('500')
    })
  })
})
