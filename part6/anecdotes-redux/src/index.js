import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createStore } from "redux";

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
  console.log(state)
  switch (action.type) {
    case "VOTE":
      const anecdote = action.payload
      return state.map(a =>
        a.id === anecdote.id ? anecdote : a
      )
    case "NEW_ANECDOTE":
      return [...state, action.payload]
    default:
      return state
  }
}

const store = createStore(anecdotesReducer)

const handleClick = (id) => {
  const anecdoteToUpdate = store.getState().find(a => {
    return a.id === id
  })
  anecdoteToUpdate.votes += 1

  store.dispatch({
    type: "VOTE",
    payload: anecdoteToUpdate
  })
}

const handleSubmit = (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ""

  const newAnecdote = {
    content: content,
    votes: 0,
    id: getId()
  }
  console.log(newAnecdote)
  store.dispatch({
    type: "NEW_ANECDOTE",
    payload: newAnecdote
  })
}

const AnecdotesForm = () => {
  return (
    <form onSubmit={handleSubmit}>
      <input name="anecdote" />
      <button type="submit">Create</button>
    </form>
  )
}

function App() {
  return (
    <>
      <h1>Anecdotes</h1>
      <AnecdotesForm />
      {store.getState().map(anecdote => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} votes
              {" "}
              <button onClick={() => handleClick(anecdote.id)}>
                Vote
              </button>
            </div>
          </div>
        )
      })}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
