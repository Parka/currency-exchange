import { Currencies } from "@everapi/freecurrencyapi-js"
import CurrencyOption from "./CurrencyOption"

type Props = {
  currencies: Currencies
}

const CurrencyOptions = ({ currencies }: Props) =>
  Object.values(currencies).map((currency) => <CurrencyOption key={currency.code} {...currency} />)

export default CurrencyOptions
