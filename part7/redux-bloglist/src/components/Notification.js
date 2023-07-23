import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { hideNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notification)
  const success = message.type === "success" ? true : false


  const styling = {
    color: success ? "#155724" : "#721c24",
    backgroundColor: success ? "#d4edda" : "#f8d7da",
    borderColor: success ? "#c3e6cb" : "#f5c6cb",
  }

  useEffect(() => {
    let timer

    if (message.value !== null) {
      timer = setTimeout(() => {
        dispatch(hideNotification())
      }, 4000)
    }

    return () => clearTimeout(timer)
  })

  if (message.value === null) return null

  return (
    <div
      className="p-3 rounded-lg mb-4 border-2"
      style={styling}
    >
      {message.value}
    </div>
  )
}

export default Notification
