import Freecurrencyapi from "@everapi/freecurrencyapi-js"

const freecurrencyapi = new Freecurrencyapi(import.meta.env.VITE_FREE_CURRENCY_API_KEY)

export default freecurrencyapi
