import { createSlice } from "@reduxjs/toolkit";

const initialState = "MOST_LIKES"

const sortBySlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    sortByOldest(state, action) {
      return "OLDEST"
    },
    sortByMostLikes(state, action) {
      return "MOST_LIKES"
    }
  }
})

export const { sortByOldest, sortByMostLikes } = sortBySlice.actions
export default sortBySlice.reducer
