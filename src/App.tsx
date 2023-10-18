import { useEffect, useRef, useState } from "react"
import freecurrencyapi from "./api"
import useCurrencies from "./hooks/useCurrencies"

function App() {
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("MXN")
  const [currencies, loadingCurrencies, retryCurrencies] = useCurrencies()
  const [loadingRates, setLoadingRates] = useState(true)
  const [rate, setRate] = useState(0)
  const [currVal1, setCurrVal1] = useState("")
  const [currVal2, setCurrVal2] = useState("")
  const [retryRates, setRetryRates] = useState(false)
  const flagUpdate1 = useRef(false)
  const flagUpdate2 = useRef(false)

  const loading = loadingCurrencies || loadingRates
  const retry = retryCurrencies || retryRates

  /// FETCH RATES
  useEffect(() => {
    if (retryRates) return
    const fetchRate = async () => {
      setLoadingRates(true)
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
        setRetryRates(true)
      }
      setLoadingRates(false)
    }
    fetchRate()
  }, [currency1, currency2, retryRates])

  // UPDATE ON RATE RECIEVED
  useEffect(() => {
    if (!rate) return
    if (flagUpdate1.current) {
      flagUpdate1.current = false
      setCurrVal1(String(Number(currVal2) / rate || ""))
    }
    if (flagUpdate2.current) {
      flagUpdate2.current = false
      setCurrVal2(String(Number(currVal1) * rate || ""))
    }
  }, [currVal1, currVal2, rate])

  // SET RETRY TIMEOUT
  useEffect(() => {
    if (!retryRates) return
    const timeout = setTimeout(() => {
      setRetryRates(false)
    }, 30000)
    return () => {
      clearTimeout(timeout)
    }
  }, [retryRates])

  // EVENT HANDLERS INPUTS
  type OnChangeInput = React.InputHTMLAttributes<HTMLInputElement>["onChange"]

  const onChange1: OnChangeInput = (e) => {
    const value = Number(e.target.value)
    if (isNaN(value)) return
    setCurrVal1(e.target.value)
    setCurrVal2(String(value * rate || ""))
  }

  const onChange2: OnChangeInput = (e) => {
    const value = Number(e.target.value)
    if (isNaN(value)) return
    setCurrVal2(e.target.value)
    setCurrVal1(String(value / rate || ""))
  }

  // EVENT HANDLERS SELECTS
  type onChangeSelect = React.SelectHTMLAttributes<HTMLSelectElement>["onChange"]

  const onChangeCurrency1: onChangeSelect = (e) => {
    flagUpdate1.current = true
    setRate(0)
    setCurrVal1("")
    setCurrency1(e.target.value)
  }
  const onChangeCurrency2: onChangeSelect = (e) => {
    flagUpdate2.current = true
    setRate(0)
    setCurrVal2("")
    setCurrency2(e.target.value)
  }
  if (retry)
    return (
      <>
        <h1>WAITING FOR API</h1>
        <span className="loader"></span>
      </>
    )
  return (
    <>
      <h1 className="mx-3 mb-16 max-w-sm text-center text-xl font-bold sm:text-3xl ">
        Currency exchange calculator
      </h1>
      <form className="flex flex-1 flex-col gap-10 sm:gap-4">
        <div className="flex flex-col-reverse sm:flex-row">
          <input
            tabIndex={2}
            className="flex-1 shrink rounded-b px-2 shadow-sm shadow-slate-600 sm:mr-2 sm:rounded"
            type="text"
            name="currency1"
            id="currency1"
            inputMode="decimal"
            value={currVal1}
            onChange={onChange1}
            disabled={loading}
          />
          <select
            tabIndex={1}
            className="rounded-t sm:rounded-none"
            value={currency1}
            onChange={onChangeCurrency1}
            disabled={loading}
          >
            {Object.values(currencies).map(({ code, name, symbol }) => (
              <option key={code} value={code}>
                {name} - {code} ({symbol})
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col-reverse sm:flex-row">
          <input
            tabIndex={4}
            className="flex-1 shrink rounded-b px-2 shadow-sm shadow-slate-600 sm:mr-2 sm:rounded"
            type="text"
            name="currency2"
            id="currency2"
            inputMode="decimal"
            value={currVal2}
            onChange={onChange2}
            disabled={loading}
          />
          <select
            tabIndex={3}
            className="rounded-t sm:rounded-none"
            value={currency2}
            onChange={onChangeCurrency2}
            disabled={loading}
          >
            {Object.values(currencies).map(({ code, name, symbol }) => (
              <option key={code} value={code}>
                {name} - {code} ({symbol})
              </option>
            ))}
          </select>
        </div>
      </form>
    </>
  )
}

export default App
