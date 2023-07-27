import { useId, useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_BORN, ALL_AUTHORS } from "../../queries"

const SetBirthyearForm = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState("")

  const nameId = useId()
  const bornId = useId()

  const [changeBirthyear] = useMutation(EDIT_BORN, {
    refetchQueries: { query: ALL_AUTHORS },
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name, born } })

    setBorn("")
  }

  return (
    <>
      <h3>Edit author</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={nameId}>name: </label>
          <select
            onChange={({ target }) => setName(target.value)}
            id="nameId"
          >
            {authors.map((author) => {
              return (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor={bornId}>born: </label>
          <input
            id={bornId}
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default SetBirthyearForm
