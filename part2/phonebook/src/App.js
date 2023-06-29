import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import noteService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const checkDuplicates = (name) => {
    let duplicate = false
    persons.forEach(person => {
      if (person.name === name.name) {
        duplicate = true
      }
    })
    return duplicate
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (checkDuplicates(personObject)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    noteService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
  }

  const destroyPerson = id => {
    const confirmation = window.confirm("Are you sure?")
    if (confirmation) {
      noteService
        .destroy(id)
        .catch(error => {
          alert("User does not exist")
        })
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new person</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        filter={filter}
        destroyPerson={destroyPerson}
      />
    </div>
  );
}

export default App;
