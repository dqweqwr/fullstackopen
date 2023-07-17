import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdotesReducer";
import { hideNotification, setNotification } from "../reducers/notificationReducer";

const AnecdotesForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created "${content}"`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
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
