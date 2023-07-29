import { Link } from "react-router-dom"

const Navbar = ({ logout }) => {
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
      {localStorage.getItem("library-graphql-token") && (
        <button onClick={logout}>Logout</button>
      )}
    </>
  )
}

export default Navbar
