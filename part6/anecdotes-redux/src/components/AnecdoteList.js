import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdotesReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotification(`you voted "${anecdote.content}"`, 5))
  }

  return (
    <div className="anecdote">
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
