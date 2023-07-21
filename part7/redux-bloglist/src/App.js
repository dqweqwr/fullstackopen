import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"
import {
  showSuccessNotification,
  showErrorNotification,
} from "./reducers/notificationReducer"
import {
  createBlog,
} from "./reducers/blogsReducer"
import BlogList from "./components/BlogList"

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedBlogListUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    const credentials = {
      username,
      password,
    }

    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)

      dispatch(showSuccessNotification(`Logged in as ${user.username}`))
    } catch (e) {
      dispatch(showErrorNotification("Invalid username or password"))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedBlogListUser")
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <Notification />
      {!user && (
        <>
          <LoginForm handleLogin={handleLogin} />
          <div>User must be logged in to see blog list</div>
        </>
      )}
      {user && (
        <>
          <h1>Blogs</h1>
          <div>
            Welcome back {user.username}!{" "}
            <button onClick={handleLogout}>Log out</button>
          </div>
          <Togglable buttonLabel="Add new blog">
            <BlogForm />
          </Togglable>
          <BlogList />
        </>
      )}
    </div>
  )
}

export default App
