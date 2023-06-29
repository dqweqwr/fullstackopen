const Person = ({ name, number, destroyPerson }) => {
  return (
    <div>
      {name} {number}
      <button onClick={destroyPerson}>delete</button>
    </div>
  )
}

const Persons = ({ persons, filter, destroyPerson }) => {
  if (filter !== "") {
    const filterRegex = new RegExp(filter, "i")
    persons = persons.filter(person => {
      return person.name.match(filterRegex)
    })
  }

  return (
    persons.map(person => {
      return (
        <Person 
          key={person.id}
          name={person.name} 
          number={person.number}
          destroyPerson={() => destroyPerson(person.id)}
        />
      )
    })
  )
}

export default Persons;
