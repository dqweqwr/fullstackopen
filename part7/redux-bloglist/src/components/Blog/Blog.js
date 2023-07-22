import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
import { useMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import blogService from "../../services/blogs"
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

  const updateLikes = async (blogToUpdate) => {
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id,
    }

    try {
      const returnedBlog = await blogService.update(
        blogToUpdate.id,
        updatedBlog,
      )

      dispatch(updateBlog(returnedBlog))
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
  }

  const removeBlog = async (blogToDelete) => {
    const id = blogToDelete.id

    try {
      await blogService.destroy(id)

      dispatch(deleteBlog(id))
      dispatch(
        showSuccessNotification(
          `"${blogToDelete.title}" by ${blogToDelete.author} deleted`,
        ),
      )
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    console.log(blog.id)
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat({ content: comment })
    }
    console.log(updatedBlog)

    try {
      await blogService.addComment(blog.id, comment)

      dispatch(updateBlog(updatedBlog))
      e.target.comment.value = ""
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <>
        <div>author: {blog.author}</div>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes}{" "}
          <button onClick={() => updateLikes(blog)}>like</button>
        </div>
        <div>Posted by: {blog.user.username}</div>
        <div>Posted: {dayjs(blog.createdAt).fromNow()}</div>
        {showDeleteButton() && (
          <button onClick={() => removeBlog(blog)}>delete</button>
        )}
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
