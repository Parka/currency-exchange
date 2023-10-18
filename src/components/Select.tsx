type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

const Select = (props: Props) => <select className="rounded-t sm:rounded-none" {...props} />

export default Select
