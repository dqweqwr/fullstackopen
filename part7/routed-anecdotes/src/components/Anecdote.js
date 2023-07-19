const Anecdote = ({ anecdote }) => {
  return (
    <div className='anecdote'>
      <div>Content: {anecdote.content}</div>
      <div>Author: {anecdote.author}</div>
      <div>
        Info:
        <a href={anecdote.info}>{anecdote.info}</a>
      </div>
      <div>Votes: {anecdote.votes}</div>
    </div>
  )
}

export default Anecdote
