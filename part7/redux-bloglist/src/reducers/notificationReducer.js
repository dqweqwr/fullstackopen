import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: null,
  type: null,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showSuccessNotification(state, action) {
      const value = action.payload
      return { type: "success", value }
    },
    showErrorNotification(state, action) {
      const value = action.payload
      return { type: "error", value }
    },
    hideNotification(state, action) {
      return initialState
    },
  },
})

export const {
  showSuccessNotification,
  showErrorNotification,
  hideNotification,
} = notificationSlice.actions
export default notificationSlice.reducer
