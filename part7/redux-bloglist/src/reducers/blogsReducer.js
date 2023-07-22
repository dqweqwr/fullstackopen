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
    createBlog(state, action) {
      const newBlog = action.payload
      return [...state, newBlog]
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const id = updatedBlog.id
      const updatedBlogs = state.map((b) => (b.id === id ? updatedBlog : b))
      return updatedBlogs
    },
    deleteBlog(state, action) {
      const id = action.payload
      const updatedBlogs = state.filter((b) => b.id !== id)
      return updatedBlogs
    },
  },
})

export const { setBlogs, createBlog, updateBlog, deleteBlog } =
  blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer
