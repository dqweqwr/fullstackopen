import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogsReducer"

import Togglable from "./Togglable"

import {
  showSuccessNotification,
  showErrorNotification,
} from "../reducers/notificationReducer"
import blogService from "../services/blogs"

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (e) => {
    e.preventDefault()

    const title = e.target.title.value
    const url = e.target.url.value
    const author = e.target.author.value

    const obj = { title, url, author }

    try {
      const newBlog = await blogService.create(obj)
      dispatch(createBlog(newBlog))
      dispatch(
        showSuccessNotification(
          `A new blog "${newBlog.title}" by ${newBlog.author} created`
        )
      )
      e.target.title.value = ""
      e.target.url.value = ""
      e.target.author.value = ""
    } catch (e) {
      const error = e.response.data.error

      dispatch(showErrorNotification(error))
    }
  }

  return (
    <>
      <Togglable buttonLabel="Add new blog">
        <h2>Create new blog listing</h2>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" name="title" />
          </div>
          <div>
            <label htmlFor="url">Url: </label>
            <input type="text" id="url" name="url" />
          </div>
          <div>
            <label htmlFor="author">Author: </label>
            <input type="text" id="author" name="author" />
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      </Togglable>
    </>
  )
}

export default BlogForm
