import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdotesReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdotesForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created "${content}"`, 5))
  }

  return (
    <>
      <h1>Create new</h1>
      <form
        onSubmit={handleSubmit}
        className="anecdote-form"
      >
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default AnecdotesForm
