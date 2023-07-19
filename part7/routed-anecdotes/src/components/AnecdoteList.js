import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => {
        const id = anecdote.id
        return (
          <li key={id}>
            <Link to={`/anecdotes/${id}`}>{anecdote.content}</Link>
          </li>
        )
      })}
    </ul>
  </div>
)

export default AnecdoteList
