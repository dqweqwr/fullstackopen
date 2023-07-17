import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from "./App"
import noteReducer, { createNote } from "./reducers/noteReducer"
import filterReducer, { filterChange } from './reducers/filterReducer';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange("IMPORTANT"))
store.dispatch(createNote("combineReducers forms one reduce from many simple reducers"))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

