import { configureStore } from "@reduxjs/toolkit"

import notificationReducer from "./reducers/notificationReducer"
import blogsReducer from "./reducers/blogsReducer"
import sortByReducer from "./reducers/sortByReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    sortBy: sortByReducer
  },
})

export default store
