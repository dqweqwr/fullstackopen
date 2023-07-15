import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createStore } from 'redux';

const noteReducer = (state = [], action) => {
  if (action.type === "NEW_NOTE") {
    return state.concat(action.payload)
  }

  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the state is in redux store",
    important: true,
    id: 1
  }
})

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2
  }
})

const App = () => {
  return (
    <>
      <ul>
        {store.getState().map(note => {
          return (
            <li key={note.id}>
              {note.content}
              {" "}
              <strong>{note.important ? "important" : "not important"}</strong>
            </li>
          )
        })}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(() => {
  console.log("store changed")
  renderApp()
})
