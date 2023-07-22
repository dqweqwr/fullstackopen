import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import AppRoutes from "./components/AppRoutes"

import { initializeLoggedUser } from "./reducers/loggedUserReducer"
import { initializeUsers } from "./reducers/usersReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLoggedUser())
    dispatch(initializeUsers())
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
