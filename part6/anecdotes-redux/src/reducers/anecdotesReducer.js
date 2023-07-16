const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (Math.random() * 1000000).toFixed(0)

const anecdotesToObject = anecdote => ({
  content: anecdote,
  votes: 0,
  id: getId()
})

const initialState = anecdotesAtStart.map(anecdotesToObject)

const anecdotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.payload.id
      const anecdote = state.find(a =>
        a.id === id
      )
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id === id ? updatedAnecdote : anecdote
      ).sort((a, b) => b.votes - a.votes)
    case "NEW_ANECDOTE":
      return [...state, action.payload]
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content: content,
      votes: 0,
      id: getId()
    }
  }
}

export const addVote = id => {
  return {
    type: "VOTE",
    payload: { id }
  }
}


export default anecdotesReducer
