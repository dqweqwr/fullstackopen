import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Menu from "./components/Menu"
import BlogForm from "./components/BlogForm"
import BlogList from "./components/BlogList"

import { initializeUser } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const user = useSelector(state => state.user)

  return (
    <>
      <Notification />
      {!user &&
        <LoginForm />
      }
      {user && (
        <>
          <Menu />
          <BlogForm />
          <BlogList />
        </>
      )}
    </>
  )
}

export default App
