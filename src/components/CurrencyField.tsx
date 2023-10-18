type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const CurrencyField = (props: Props) => (
  <div className="flex flex-col-reverse sm:flex-row" {...props} />
)

export default CurrencyField
