import { ReactNode } from "react"

const Loader = ({ children }: { children: ReactNode }) => (
  <>
    <h1>{children}</h1>
    <span className="loader"></span>
  </>
)
export default Loader
