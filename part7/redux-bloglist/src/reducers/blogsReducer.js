import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const initialState = []

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    newBlog(state, action) {
      const newBlog = action.payload
      return [...state, newBlog]
    },
    changeBlog(state, action) {
      const updatedBlog = action.payload
      const id = updatedBlog.id
      const updatedBlogs = state.map((b) => (b.id === id ? updatedBlog : b))
      return updatedBlogs
    },
    destroyBlog(state, action) {
      const id = action.payload
      const updatedBlogs = state.filter((b) => b.id !== id)
      return updatedBlogs
    },
  },
})

export const { setBlogs, newBlog, changeBlog, destroyBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (obj) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(obj)
    dispatch(newBlog(createdBlog))
  }
}

export const updateBlog = (updatedBlog) => {
  const id = updatedBlog.id
  return async (dispatch) => {
    const returnedBlog = await blogService.update(id, updatedBlog)

    dispatch(changeBlog(returnedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.destroy(id)

    dispatch(destroyBlog(id))
  }
}

export const addComment = (blog, comment) => {
  const updatedBlog = {
    ...blog,
    comments: blog.comments.concat({ content: comment }),
  }
  return async (dispatch) => {
    await blogService.addComment(blog, comment)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogsSlice.reducer
