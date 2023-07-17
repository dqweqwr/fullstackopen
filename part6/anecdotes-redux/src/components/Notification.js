import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const show = notification.display ? "block" : "none"

  return (
    <div
      className="notification"
      style={{display: show}}
    >
      {notification.message}
    </div>
  )
}

export default Notification
