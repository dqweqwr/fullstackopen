import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    personService
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

  const showNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const successMessage = {
      type: "success",
      body: `Added ${personObject.name}`
    }

    if (checkDuplicates(personObject)) {
      replaceNumber(personObject)
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(successMessage)
        setNewName("")
        setNewNumber("")
      })
      .catch(err => {
        const failureMessage = {
          type: "failure",
          body: err.response.data.error
        }
        showNotification(failureMessage)
      })
  }

  const replaceNumber = (changedPerson) => {
    const confirmation = window.confirm(`${changedPerson.name} is already added into the phonebook, replace the old number with a new one?`)
    if (confirmation) {
      const person = persons.find(p => p.name === changedPerson.name)
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => 
            p.name === changedPerson.name 
              ? returnedPerson
              : p
          ))
        })
        .catch(err => {
          const failureMessage = {
            type: "failure",
            body: err.response.data.error
          }
          showNotification(failureMessage)
        })
      return
    }
  }

  const destroyPerson = id => {
    const confirmation = window.confirm("Are you sure?")
    if (confirmation) {
      personService
        .destroy(id)
        .catch(error => {
          const failureMessage = {
            type: "failure",
            body:`User does not exist` 
          }
          showNotification(failureMessage)
        })
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Notification message={message} />
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
