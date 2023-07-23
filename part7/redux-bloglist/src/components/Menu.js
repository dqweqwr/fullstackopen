import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../reducers/loggedUserReducer"

const Menu = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.loggedUser)

  return (
    <div className="p-3 py-5 shadow-md bg-gray-100">
      <div className="flex flex-row justify-between limit-size">
        <div className="flex flex-row items-center gap-10">
          <h1 className="text-3xl font-extrabold">Blogs</h1>
          <div className="flex flex-row gap-6 items-center">
            <Link className="link" to="/">Blogs</Link>
            <Link className="link" to="/users">Users</Link>
          </div>
        </div>
        <div className="flex flex-row gap-5 items-center">
          <div>
            <div className="font-light text-xs content-center">
              Welcome back,
            </div>
            <div
              className="font-bold"
            >
              {loggedUser.name} (@{loggedUser.username})
            </div>
          </div>
          <button
            className="button text-white bg-purple-800 hover:bg-pink-500 duration-300"
            onClick={() => dispatch(handleLogout())}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Menu
