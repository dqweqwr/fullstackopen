import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAll, updateAnecdote } from "../requests"
import { useNotificationDispatch } from '../NotificationContext'

const Anecdote = ({ anecdote }) => {
  const setNotification = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      const updatedAnecdotes = anecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData("anecdotes", updatedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    setNotification(`you voted "${anecdote.content}"`)
  }

  return (
    <>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    </>
  )
}

const Anecdotes = () => {
  const result = useQuery("anecdotes", getAll, {
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.error) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
    </>
  )
}

export default Anecdotes
