import { useEffect, useState } from "react"

function App() {
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("MXN")
  const [loading, setLoading] = useState(true)
  const [rate, setRate] = useState(0)
  const [currVal1, setCurrVal1] = useState("")
  const [currVal2, setCurrVal2] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setRate(2)
      setLoading(false)
    }, 1000)
  }, [])

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
      <form>
        <div>
          <div>
            <input
              type="text"
              name="currency1"
              id="currency1"
              inputMode="decimal"
              value={currVal1}
              onChange={onChange1}
              disabled={loading}
            />
            <label htmlFor="currency1">{currency1}</label>
          </div>
          <div>
            <input
              type="text"
              name="currency2"
              id="currency2"
              inputMode="decimal"
              value={currVal2}
              onChange={onChange2}
              disabled={loading}
            />
            <label htmlFor="currency2">{currency2}</label>
          </div>
        </div>
      </form>
    </>
  )
}

export default App
