import { useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS } from "./queries"

const App = () => {
  const result = useQuery(ALL_PERSONS)
  console.log(result.data)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <PersonForm />
      <Persons persons={result.data.allPersons} />
    </>
  )
}

export default App
