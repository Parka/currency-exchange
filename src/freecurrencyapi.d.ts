declare module "@everapi/freecurrencyapi-js" {
  export default class Freecurrencyapi {
    constructor(key: string)
    latest(config: { base_currency: string; currencies: string }): Promise<{
      data: Record<string, number>
    }>
  }
}
