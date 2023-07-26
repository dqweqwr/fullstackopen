import { useQuery } from "@apollo/client"
import { useState } from "react"
import PersonForm from "./components/PersonForm"
import PhoneForm from "./components/PhoneForm"
import Persons from "./components/Persons"
import { ALL_PERSONS } from "./queries"
import Notification from "./components/Notification"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  console.log(result.data)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  return (
    <>
      <Notification errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </>
  )
}

export default App
