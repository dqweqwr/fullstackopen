import { Alert } from "react-bootstrap"

const Notification = ({ message }) => {
  return (
    <>
      {message &&
        <Alert variant="success">
          {message}
        </Alert>
      }
    </>
  )
}

export default Notification
