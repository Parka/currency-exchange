import { useEffect, useRef, useState } from "react"
import useCurrencies from "./hooks/useCurrencies"
import useRates from "./hooks/useRates"
import Loader from "./components/Loader"
import Input from "./components/Input"
import Select from "./components/Select"
import Title from "./components/Title"
import Form from "./components/Form"
import CurrencyField from "./components/CurrencyField"
import CurrencyOptions from "./components/CurrencyOptions"

function App() {
  const [currency1, setCurrency1] = useState("USD")
  const [currency2, setCurrency2] = useState("MXN")
  const [currVal1, setCurrVal1] = useState("")
  const [currVal2, setCurrVal2] = useState("")

  const [currencies, loadingCurrencies, retryCurrencies] = useCurrencies()
  const [rate, loadingRates, retryRates] = useRates(currency1, currency2)

  const loading = loadingCurrencies || loadingRates
  const retry = retryCurrencies || retryRates

  const flagUpdate1 = useRef(false)
  const flagUpdate2 = useRef(false)

  // UPDATE ON RATE RECIEVED
  useEffect(() => {
    if (loadingRates) return
    if (flagUpdate1.current) {
      flagUpdate1.current = false
      setCurrVal1(String(Number(currVal2) / rate || ""))
    }
    if (flagUpdate2.current) {
      flagUpdate2.current = false
      setCurrVal2(String(Number(currVal1) * rate || ""))
    }
  }, [currVal1, currVal2, rate, loadingRates])

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
    setCurrency1(e.target.value)
  }
  const onChangeCurrency2: onChangeSelect = (e) => {
    flagUpdate2.current = true
    setCurrency2(e.target.value)
  }

  if (retry) return <Loader> Waiting for API</Loader>
  return (
    <>
      <Title>Currency exchange calculator</Title>
      <Form>
        <CurrencyField>
          <Input
            tabIndex={2}
            name="currency1"
            id="currency1"
            value={currVal1}
            onChange={onChange1}
            disabled={loading}
          />
          <Select tabIndex={1} value={currency1} onChange={onChangeCurrency1} disabled={loading}>
            <CurrencyOptions currencies={currencies} />
          </Select>
        </CurrencyField>
        <CurrencyField>
          <Input
            tabIndex={4}
            name="currency2"
            id="currency2"
            value={currVal2}
            onChange={onChange2}
            disabled={loading}
          />
          <Select tabIndex={3} value={currency2} onChange={onChangeCurrency2} disabled={loading}>
            <CurrencyOptions currencies={currencies} />
          </Select>
        </CurrencyField>
      </Form>
    </>
  )
}

export default App
