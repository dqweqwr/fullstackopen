import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"

import Notification from "./Notification"
import LoginForm from "./LoginForm"
import Menu from "./Menu"
import BlogForm from "./Blog/BlogForm"
import BlogList from "./Blog/BlogList"
import Users from "./Users/Users"
import User from "./Users/User"

const AppRoutes = () => {
  const loggedUser = useSelector((state) => state.loggedUser)

  if (!loggedUser)
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    )

  return (
    <>
      <Notification />
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BlogForm />
              <BlogList />
            </>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </>
  )
}

export default AppRoutes
