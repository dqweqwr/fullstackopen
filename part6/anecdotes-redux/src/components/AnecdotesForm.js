import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdotesReducer";
import { hideNotification, setNotification } from "../reducers/notificationReducer";
import anecdoteServices from "../services/anecdotes";

const AnecdotesForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(createAnecdote(newAnecdote))    

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
