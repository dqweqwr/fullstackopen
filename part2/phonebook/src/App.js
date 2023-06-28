import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" }
  ])
  const [newName, setNewName] = useState("")

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const checkDuplicates = (name) => {
    let duplicate = false
    persons.forEach(person => {
      duplicate = person.name === name.name
    })
    return duplicate
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    if (checkDuplicates(personObject)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return <div key={person.name}>{person.name}</div>
      })}
    </div>
  );
}

export default App;
