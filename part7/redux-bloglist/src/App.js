import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import Blog from "./components/Blog"

import blogService from "./services/blogs"
import loginService from "./services/login"
import {
  showSuccessNotification,
  showErrorNotification,
} from "./reducers/notificationReducer"
import {
  setBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./reducers/blogsReducer"

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)
  const [sortByLikes, setSortByLikes] = useState(true)

  const blogFormRef = useRef()

  useEffect(() => {
    const initializeBlogList = async () => {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }

    initializeBlogList()
  }, [])

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

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(createBlog(newBlog))
      dispatch(
        showSuccessNotification(
          `A new blog "${newBlog.title}" by ${newBlog.author} created`
        )
      )
      blogFormRef.current.toggleVisibility()
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
  }

  const updateLikes = async (id) => {
    const blogToUpdate = blogs.find((b) => b.id === id)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id,
    }

    try {
      const returnedBlog = await blogService.update(id, updatedBlog)

      dispatch(updateBlog(returnedBlog))
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id)

    try {
      await blogService.destroy(id)

      dispatch(deleteBlog(id))
      dispatch(
        showSuccessNotification(
          `"${blogToDelete.title}" by ${blogToDelete.author} deleted`
        )
      )
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
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
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <br />
          <div>
            Sorted by:{" "}
            <button onClick={() => setSortByLikes(!sortByLikes)}>
              {sortByLikes ? "most liked" : "oldest"}
            </button>{" "}
            on top
          </div>
          <div className="list-of-blogs">
            {sortByLikes &&
              [...blogs]
                .sort((a, b) => {
                  return b.likes - a.likes
                })
                .map((blog) => {
                  return (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      updateLikes={updateLikes}
                      deleteBlog={deleteBlog}
                    />
                  )
                })}
            {!sortByLikes &&
              blogs.map((blog) => {
                return (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    updateLikes={updateLikes}
                    deleteBlog={deleteBlog}
                  />
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}

export default App
