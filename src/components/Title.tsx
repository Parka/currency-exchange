type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

const Title = (props: Props) => (
  <h1 className="mx-3 mb-16 max-w-sm text-center text-xl font-bold sm:text-3xl " {...props} />
)

export default Title
