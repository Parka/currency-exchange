import { Currency } from "@everapi/freecurrencyapi-js"

type Props = React.DetailedHTMLProps<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
> &
  Currency

const CurrencyOption = ({ name, code, symbol, ...props }: Props) => {
  return (
    <option value={code} {...props}>
      {name} - {code} ({symbol})
    </option>
  )
}

export default CurrencyOption
