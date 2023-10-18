import { useEffect, useState } from "react"
import freecurrencyapi from "../api"

const useRates = (currency1: string, currency2: string): [number, boolean, boolean] => {
  const [rate, setRate] = useState(0)
  const [loading, setLoading] = useState(true)
  const [retry, setRetry] = useState(false)

  useEffect(() => {
    if (retry) return
    const fetchRate = async () => {
      setLoading(true)
      setRate(0)
      try {
        const response = await freecurrencyapi.latest({
          base_currency: currency1,
          currencies: currency2,
        })

        if (!response.data) {
          throw response.message
        }

        const { data } = response
        setRate(data[currency2])
      } catch (e) {
        setRetry(true)
      }
      setLoading(false)
    }
    fetchRate()
  }, [currency1, currency2, retry])

  useEffect(() => {
    if (!retry) return
    const timeout = setTimeout(() => {
      setRetry(false)
    }, 30000)
    return () => {
      clearTimeout(timeout)
    }
  }, [retry])

  return [rate, loading, retry]
}

export default useRates
