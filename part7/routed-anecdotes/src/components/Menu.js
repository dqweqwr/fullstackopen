import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <div>
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/about">about</Link>
      <Link className="link" to="/create">Create new</Link>
    </div>
  )
}

export default Menu
