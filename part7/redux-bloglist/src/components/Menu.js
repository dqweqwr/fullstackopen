import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../reducers/userReducer"

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  return (
    <>
      <h1>Blogs</h1>
      <div>
        Welcome back {user.username}!{" "}
        <button onClick={() => dispatch(handleLogout())}>Log out</button>
      </div>
    </>
  )
}

export default Menu
