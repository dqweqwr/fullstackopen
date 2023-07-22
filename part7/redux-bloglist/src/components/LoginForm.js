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
    <>
      <form onSubmit={login}>
        <div>
          <label htmlFor="username">username: </label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  )
}

export default LoginForm
