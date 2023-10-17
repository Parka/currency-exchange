declare module "@everapi/freecurrencyapi-js" {
  export interface Currency {
    symbol: string
    name: string
    symbol_native: string
    decimal_digits: number
    rounding: number
    code: string
    name_plural: string
  }
  export interface Currencies extends Record<string, Currency> {}

  export default class Freecurrencyapi {
    constructor(key: string)
    currencies(): Promise<{ data: Currencies }>
    latest(config: { base_currency: string; currencies: string }): Promise<{
      data: Record<string, number>
    }>
  }
}
