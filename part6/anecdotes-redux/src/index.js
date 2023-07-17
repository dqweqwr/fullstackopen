import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import anecdotesReducer from './reducers/anecdotesReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer
})
const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
