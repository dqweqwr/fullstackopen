import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const Menu = ({ user }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav.Link href="#" as="span">
          <Link className="link" to="/">home</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link className="link" to="/notes">notes</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link className="link" to="/users">users</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          {user
            ? <em>{user} logged in</em>
            : <Link className="link" to="/login">login</Link>
          }
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
