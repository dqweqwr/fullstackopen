import { useApolloClient, useQuery } from "@apollo/client"
import { useState } from "react"
import PersonForm from "./components/PersonForm"
import PhoneForm from "./components/PhoneForm"
import Persons from "./components/Persons"
import { ALL_PERSONS } from "./queries"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  if (result.loading) {
    return <div>Loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem("phonenumbers-user-token")
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <Notification errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  return (
    <>
      <Notification errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </>
  )
}

export default App
