type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

const Form = (props: Props) => <form className="flex flex-1 flex-col gap-10 sm:gap-4" {...props} />

export default Form
