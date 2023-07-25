import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_PERSONS, CREATE_PERSON } from "../queries"

const PersonForm = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    createPerson({ variables: { name, phone, street, city } })

    setName("")
    setPhone("")
    setCity("")
    setStreet("")
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name:</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">phone:</label>
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">city:</label>
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <div>
          <label htmlFor="street">street:</label>
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  )
}

export default PersonForm
