import { createContext, useContext, useReducer } from "react";

const initialState = {
  message: "",
  show: false
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload
    case "HIDE":
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  const dispatch = notificationAndDispatch[1]

  return (message) => {
    dispatch({
      type: "SHOW",
      payload: { message, show: true }
    })
    setTimeout(() => {
      dispatch({ type: "HIDE" })
    }, 4000)
  }
}

export default NotificationContext
