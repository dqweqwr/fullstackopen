import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  display: false
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return {
        display: true,
        message: action.payload
      }
    },
    hideNotification(state, action) {
      return initialState
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  const ms = seconds * 1000

  return (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, ms)
  }
}

export default notificationSlice.reducer
