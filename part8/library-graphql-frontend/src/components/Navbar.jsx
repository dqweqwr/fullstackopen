import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/authors">
        Authors
      </Link>
      <Link className="link" to="/books">
        Books
      </Link>
    </>
  )
}

export default Navbar
