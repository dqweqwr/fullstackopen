const Persons = ({ persons, filter }) => {
  if (filter === "") {
    return (
      persons.map(person => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        )
      })
    )
  }

  const filterRegex = new RegExp(filter, "i")
  const filteredPersons = persons.filter(person => {
    return person.name.match(filterRegex)
  })

  return (
    filteredPersons.map(person => {
      return (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      )
    })
  )
}

export default Persons;
