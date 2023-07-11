import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [author, setAuthor] = useState("")

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

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleLogin = async event => {
    event.preventDefault()
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
      setUsername("")
      setPassword("")
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
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedBlogListUser")
    setUser(null)
    blogService.setToken(null)
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }
  
  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title, url, author
      }

      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setTitle("")
      setUrl("")
      setAuthor("")
      showNotification({
        type: "success",
        value: `A new blog '${title}' by ${author} created`
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
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
        <div>
          User must be logged in to see blog list
        </div>
        </>
      }
      {user &&
        <>
        <h1>Blogs</h1>
        <div>
          Welcome back {user.name}!
          <button onClick={handleLogout}>
            Log out
          </button>
        </div>
        <BlogForm
          title={title}
          handleTitleChange={handleTitleChange}
          url={url}
          handleUrlChange={handleUrlChange}
          author={author}
          handleAuthorChange={handleAuthorChange}
          addBlog={addBlog}
        />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      }
    </div>
  )
}

export default App
