import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
      const response = await loginService
        .login(credentials)

      setUser(response)
      setUsername("")
      setPassword("")

      showNotification({
        type: "success",
        value: `Logged in as ${response.username}`
      })
    } catch(e) {
      showNotification({
        type: "error",
        value: "Invalid username or password"
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
        <div>Welcome back {user.name}!</div>
        <h1>Blogs</h1>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      }
    </div>
  )
}

export default App
