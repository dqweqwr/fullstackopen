import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"
import {
  showSuccessNotification,
  showErrorNotification,
} from "./notificationReducer"

const initialState = null

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = localStorage.getItem("loggedBlogListUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const handleLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(showSuccessNotification(`Logged in as ${user.username}`))
    } catch (e) {
      dispatch(showErrorNotification("Invalid username or password"))
    }
  }
}

export const handleLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("loggedBlogListUser")
    blogService.setToken(null)
    dispatch(removeUser())
    dispatch(showSuccessNotification(`Logged out`))
  }
}

export default userSlice.reducer
