import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdotesReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes
        <button onClick={handleClick}>
          vote
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

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
