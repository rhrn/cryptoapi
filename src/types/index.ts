export interface SchemasType {
  definitions: {
    [index: string]: any
  }
}

export type CURRENCY = string
export type CURRENCIES = CURRENCY[]

export interface GetPricesOptions {
  fsyms: CURRENCIES
  tsyms: CURRENCIES
}

export type RawData = any
export type DisplayData = any

export interface InputPrices {
  RAW: {
    [key: string]: RawData
  }
  DISPLAY: {
    [key: string]: DisplayData
  }
}

export interface ControllerResult<T> {
  data?: T
  error: unknown
}
