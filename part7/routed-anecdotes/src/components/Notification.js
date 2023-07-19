const Notification = ({ notification }) => {
  const { message, show } = notification
  return (
    <div
      className={`notification success`}
      style={{ display: show ? "block" : "none" }}
    >
      {message}
    </div>
  )
}

export default Notification
