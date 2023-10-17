import { useEffect, useRef, useState } from "react"
import freecurrencyapi from "./api"
import { Currencies } from "@everapi/freecurrencyapi-js"

function App() {
  const [currencies, setCurrencies] = useState<Currencies>({})
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("MXN")
  const [loadingCurrencies, setLoadingCurrencies] = useState(true)
  const [loadingRates, setLoadingRates] = useState(true)
  const loading = loadingCurrencies || loadingRates
  const [rate, setRate] = useState(0)
  const [currVal1, setCurrVal1] = useState("")
  const [currVal2, setCurrVal2] = useState("")
  const flagUpdate1 = useRef(false)
  const flagUpdate2 = useRef(false)

  /// FETCH CURRENCIES
  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoadingCurrencies(true)
      const { data } = await freecurrencyapi.currencies()
      setCurrencies(data)
      setLoadingCurrencies(false)
    }
    fetchCurrencies()
  }, [])

  /// FETCH RATES
  useEffect(() => {
    const fetchRate = async () => {
      setLoadingRates(true)
      const { data } = await freecurrencyapi.latest({
        base_currency: currency1,
        currencies: currency2,
      })
      setRate(data[currency2])
      setLoadingRates(false)
    }
    fetchRate()
  }, [currency1, currency2])

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

  return (
    <>
      <h1 className="mx-3 mb-4 max-w-sm text-center text-xl font-bold sm:text-3xl ">
        Currency exchange calculator
      </h1>
      <form className="flex flex-1 flex-col gap-2">
        <div className="flex">
          <input
            className="mr-2 flex-1 shrink shadow-sm shadow-slate-600"
            type="text"
            name="currency1"
            id="currency1"
            inputMode="decimal"
            value={currVal1}
            onChange={onChange1}
            disabled={loading}
          />
          <select value={currency1} onChange={onChangeCurrency1} disabled={loading}>
            {Object.values(currencies).map(({ code }) => (
              <option key={code}>{code}</option>
            ))}
          </select>
        </div>
        <div className="flex">
          <input
            className="mr-2 flex-1 shrink shadow-sm shadow-slate-600"
            type="text"
            name="currency2"
            id="currency2"
            inputMode="decimal"
            value={currVal2}
            onChange={onChange2}
            disabled={loading}
          />
          <select value={currency2} onChange={onChangeCurrency2} disabled={loading}>
            {Object.values(currencies).map(({ code }) => (
              <option key={code}>{code}</option>
            ))}
          </select>
        </div>
      </form>
    </>
  )
}

export default App
