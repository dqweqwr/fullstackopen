import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { hideNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notification)

  useEffect(() => {
    let timer

    if (message.value !== null) {
      timer = setTimeout(() => {
        dispatch(hideNotification())
      }, 4000)
    }

    return () => clearTimeout(timer)
  })

  if (message === null) return null

  return <div className={message.type}>{message.value}</div>
}

export default Notification
