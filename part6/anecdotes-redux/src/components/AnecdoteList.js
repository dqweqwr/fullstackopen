import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdotesReducer"

const Anecdote = ({ anecdote, handleClick }) => {
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
  const dispatch = useDispatch()

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
            handleClick={() => 
              dispatch(addVote(anecdote.id))
            }
          />
        )
      })}
    </>
  )
}

export default AnecdoteList
