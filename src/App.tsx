import { useEffect, useState } from "react"
import freecurrencyapi from "./api"

function App() {
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("MXN")
  const [loading, setLoading] = useState(true)
  const [rate, setRate] = useState(0)
  const [currVal1, setCurrVal1] = useState("")
  const [currVal2, setCurrVal2] = useState("")

  useEffect(() => {
    const fetchRate = async () => {
      const { data } = await freecurrencyapi.latest({
        base_currency: currency1,
        currencies: currency2,
      })
      setRate(data[currency2])
      setLoading(false)
    }
    fetchRate()
  }, [currency1, currency2])

  type OnChange = React.InputHTMLAttributes<HTMLInputElement>["onChange"]
  const onChange1: OnChange = (e) => {
    const value = Number(e.target.value)
    if (isNaN(value)) return
    setCurrVal1(e.target.value)
    setCurrVal2(String(value * rate || ""))
  }

  const onChange2: OnChange = (e) => {
    const value = Number(e.target.value)
    if (isNaN(value)) return
    setCurrVal2(e.target.value)
    setCurrVal1(String(value / rate || ""))
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
          <label htmlFor="currency1" className="w-10">
            {currency1}
          </label>
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
          <label htmlFor="currency2" className="w-10">
            {currency2}
          </label>
        </div>
      </form>
    </>
  )
}

export default App
