import { PrismaClient } from '@prisma/client'
import { GetPricesOptions, InputPrices } from '../../../types/index'

const prisma = new PrismaClient({
  // log: [ "info", "query" ]
})

export const addPrices = async (data: InputPrices): Promise<any> => {
  const fsyms = Object.keys(data.RAW)

  const promises = fsyms.map(async fsym => {
    const tsyms = Object.keys(data.RAW[fsym])

    const promises = tsyms.map(async tsym => {
      const raw = data.RAW[fsym][tsym]
      const display = data.DISPLAY[fsym][tsym]

      const isExists = await prisma.cryptocomparePrice.findFirst({
        where: {
          fsym,
          tsym
        }
      })

      if (isExists) {
        return await prisma.cryptocomparePrice.update({
          where: {
            id: isExists.id
          },
          data: {
            raw,
            display
          }
        })
      }

      return await prisma.cryptocomparePrice.create({
        data: {
          fsym,
          tsym,
          raw,
          display
        }
      })
    })

    return await Promise.all(promises)
  })

  return await Promise.all(promises)
}

export const getPrices = async ({ fsyms, tsyms }: GetPricesOptions): Promise<InputPrices> => {
  const prices = await prisma.cryptocomparePrice.findMany({
    where: {
      fsym: { in: fsyms },
      tsym: { in: tsyms }
    }
  })

  return prices.reduce((data: InputPrices, currency: any) => {
    data.RAW[currency.fsym] = data.RAW[currency.fsym] || {}
    data.RAW[currency.fsym][currency.tsym] = currency.raw

    data.DISPLAY[currency.fsym] = data.DISPLAY[currency.fsym] || {}
    data.DISPLAY[currency.fsym][currency.tsym] = currency.display

    return data
  }, { RAW: {}, DISPLAY: {} })
}
