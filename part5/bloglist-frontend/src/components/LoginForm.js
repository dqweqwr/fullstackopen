const LoginForm = (props) => {
  const {
    handleLogin,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
  } = props

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  )
}

export default LoginForm
