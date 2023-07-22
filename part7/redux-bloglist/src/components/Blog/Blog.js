import { useState } from "react"
import { useDispatch } from "react-redux"

import blogService from "../../services/blogs"
import { updateBlog, deleteBlog } from "../../reducers/blogsReducer"
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../reducers/notificationReducer"

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

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

  return (
    <div className="blog-listing">
      <div>
        title: {blog.title} author: {blog.author}{" "}
        <button onClick={toggleShowDetails}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails && (
        <>
          <div>url: {blog.url}</div>
          <div>
            likes: {blog.likes}{" "}
            <button onClick={() => updateLikes(blog)}>like</button>
          </div>
          <div>Posted by: {blog.user.username}</div>
          {showDeleteButton() && (
            <button onClick={() => removeBlog(blog)}>delete</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
