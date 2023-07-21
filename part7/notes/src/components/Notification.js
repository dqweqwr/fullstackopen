import { Alert } from "@mui/material"

const Notification = ({ message }) => {
  return (
    <>
      {message &&
        <Alert severity="success">
          {message}
        </Alert>
      }
    </>
  )
}

export default Notification
