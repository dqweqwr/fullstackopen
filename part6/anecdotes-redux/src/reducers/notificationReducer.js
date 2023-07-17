import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  display: false
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
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

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
