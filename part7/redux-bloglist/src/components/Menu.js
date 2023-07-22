import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../reducers/loggedUserReducer"

const Menu = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.loggedUser)

  return (
    <>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {loggedUser.username} Logged in{" "}
      <button onClick={() => dispatch(handleLogout())}>Log out</button>
      <h1>Blogs</h1>
    </>
  )
}

export default Menu
