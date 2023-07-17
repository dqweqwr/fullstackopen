const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_FILTER":
      return action.payload
    default:
      return state
  }
}

export const filterChange = (filter) => {
  return {
    type: "UPDATE_FILTER",
    payload: filter
  }
}

export default filterReducer
