import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"
import {
  showSuccessNotification,
  showErrorNotification,
} from "./notificationReducer"

const initialState = null

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    },
    removeLoggedUser(state, action) {
      return null
    },
  },
})

export const { setLoggedUser, removeLoggedUser } = loggedUserSlice.actions

export const initializeLoggedUser = () => {
  return (dispatch) => {
    const loggedUserJSON = localStorage.getItem("loggedBlogListUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch(setLoggedUser(loggedUser))
    }
  }
}

export const handleLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      dispatch(setLoggedUser(loggedUser))
      dispatch(showSuccessNotification(`Logged in as ${loggedUser.username}`))
    } catch (e) {
      dispatch(showErrorNotification("Invalid username or password"))
    }
  }
}

export const handleLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("loggedBlogListUser")
    blogService.setToken(null)
    dispatch(removeLoggedUser())
    dispatch(showSuccessNotification(`Logged out`))
  }
}

export default loggedUserSlice.reducer
