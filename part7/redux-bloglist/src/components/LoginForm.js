import { useDispatch } from "react-redux"
import { handleLogin } from "../reducers/loggedUserReducer"

const LoginForm = () => {
  const dispatch = useDispatch()

  const login = (e) => {
    e.preventDefault()

    const password = e.target.password.value
    const username = e.target.username.value

    dispatch(handleLogin(username, password))
  }

  return (
    <div className="container min-h-screen justify-center">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <div className="max-w-sm mx-auto">
        <form onSubmit={login}>
          <div>
            <label htmlFor="username">username: </label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">password: </label>
            <input type="password" id="password" name="password" />
          </div>
          <button className="button rounded-lg" type="submit">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
