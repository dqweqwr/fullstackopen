import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../reducers/loggedUserReducer"

const Menu = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.loggedUser)

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <h1>Blogs</h1>
      <div>
        Welcome back {loggedUser.username}!{" "}
        <button onClick={() => dispatch(handleLogout())}>Log out</button>
      </div>
    </>
  )
}

export default Menu
