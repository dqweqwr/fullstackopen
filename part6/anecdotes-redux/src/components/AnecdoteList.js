import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdotesReducer"
import { setNotification, hideNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes
        {" "}
        <button onClick={handleClick}>
          vote
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes })=> {
    if (filter === "") {
      return anecdotes
    }
    return anecdotes.filter(anecdote => {
      const escapedFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const matcher = new RegExp(escapedFilter, "i")
      return anecdote.content.match(matcher)
    })
  })

  return (
    <>
      {anecdotes.map(anecdote => {
        return (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
          />
        )
      })}
    </>
  )
}

export default AnecdoteList
