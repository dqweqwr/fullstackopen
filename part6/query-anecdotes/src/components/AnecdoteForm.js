import { useMutation, useQueryClient } from "react-query"
import { useNotificationDispatch } from "../NotificationContext"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const setNotification = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote))
      setNotification(`Created "${newAnecdote.content}"`)
    },
    onError: (error) => {
      setNotification(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
