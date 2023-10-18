import { Currencies } from "@everapi/freecurrencyapi-js"
import { useEffect, useState } from "react"
import freecurrencyapi from "../api"

const useCurrencies = (): [Currencies, boolean, boolean] => {
  const [currencies, setCurrencies] = useState<Currencies>({})
  const [loading, setLoading] = useState(true)
  const [retry, setRetry] = useState(false)

  useEffect(() => {
    if (retry) return
    const fetchCurrencies = async () => {
      setLoading(true)
      try {
        const response = await freecurrencyapi.currencies()
        if (!response.data) {
          throw response.message
        }
        const { data } = response
        setCurrencies(data)
        setLoading(false)
      } catch (e) {
        setRetry(true)
      }
    }
    fetchCurrencies()
  }, [retry, setRetry])

  useEffect(() => {
    if (!retry) return
    const timeout = setTimeout(() => {
      setRetry(false)
    }, 30000)
    return () => {
      clearTimeout(timeout)
    }
  }, [retry])

  return [currencies, loading, retry]
}

export default useCurrencies
