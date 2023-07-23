import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
import { useMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { updateBlog, deleteBlog, addComment } from "../../reducers/blogsReducer"
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../reducers/notificationReducer"

const Blog = () => {
  const dispatch = useDispatch()

  const match = useMatch("/blogs/:id")
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id),
  )

  if (!blog) return null

  const showDeleteButton = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser")

    if (loggedUserJSON === null) return false

    const loggedUser = JSON.parse(loggedUserJSON).username
    const blogUser = blog.user.username
    return loggedUser === blogUser
  }

  const updateLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    try {
      dispatch(updateBlog(updatedBlog))
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
  }

  const removeBlog = async () => {
    try {
      dispatch(deleteBlog(blog.id))
      dispatch(
        showSuccessNotification(`"${blog.title}" by ${blog.author} deleted`),
      )
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value

    try {
      dispatch(addComment(blog, comment))
      e.target.comment.value = ""
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
  }

  return (
    <div className="container font-medium">
      <h1 className="text-3xl font-bold text-center">{blog.title}</h1>
      <>
        <div>author: {blog.author}</div>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes} <button onClick={updateLikes}>like</button>
        </div>
        <div>Posted by: {blog.user.username}</div>
        <div>Posted: {dayjs(blog.createdAt).fromNow()}</div>
        {showDeleteButton() && <button onClick={removeBlog}>delete</button>}
        <h3>comments</h3>
        <form onSubmit={handleSubmit}>
          <input name="comment" placeholder="enter a comment" />
          <button type="submit">Add</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment.content}</li>
          ))}
        </ul>
      </>
    </div>
  )
}

export default Blog
