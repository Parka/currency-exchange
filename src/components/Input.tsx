type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = (props: Props) => (
  <input
    className="flex-1 shrink rounded-b px-2 shadow-sm shadow-slate-600 sm:mr-2 sm:rounded"
    type="text"
    inputMode="decimal"
    {...props}
  />
)

export default Input
