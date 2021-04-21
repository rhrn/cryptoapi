import { GetPricesOptions, InputPrices, ControllerResult } from '../../../types/index'
import { getPrices as getPricesModel } from '../models'

import { BadRequestError, InternalServerError } from '../../../errors/index'
import { SymbolsQueryValidator } from '../validators'

export const getPrices = async ({ fsyms, tsyms }: GetPricesOptions): Promise<ControllerResult<InputPrices>> => {
  const result: ControllerResult<InputPrices> = {
    error: null
  }

  const isValid = SymbolsQueryValidator({ fsyms, tsyms })

  if (isValid === false) {
    result.error = new BadRequestError(SymbolsQueryValidator.errors)
    return result
  }

  try {
    result.data = await getPricesModel({ fsyms, tsyms })
  } catch {
    result.error = new InternalServerError()
  }

  return result
}
