import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedBlogListUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const handleLogin = async (username, password)=> {
    const credentials = {
      username,
      password
    }

    try {
      const user = await loginService
        .login(credentials)

      window.localStorage.setItem(
        "loggedBlogListUser", JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)

      showNotification({
        type: "success",
        value: `Logged in as ${user.username}`
      })
    } catch(e) {
      showNotification({
        type: "error",
        value: "Invalid username or password"
      })
      throw Error
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedBlogListUser")
    setUser(null)
    blogService.setToken(null)
  }
  
  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      showNotification({
        type: "success",
        value: `A new blog '${newBlog.title}' by ${newBlog.author} created`
      })
    } catch (e) {
      const error = e.response.data.error

      showNotification({
        type: "error",
        value: error
      })
    }
  }

  return (
    <div>
      <Notification message={message} />
      {!user && 
        <>
        <LoginForm handleLogin={handleLogin} />
        <div>
          User must be logged in to see blog list
        </div>
        </>
      }
      {user &&
        <>
          <h1>Blogs</h1>
          <div>
            Welcome back {user.username}!
            {" "}
            <button onClick={handleLogout}>
              Log out
            </button>
          </div>
          <Togglable buttonLabel="Add new blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  )
}

export default App
