import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import anecdotesReducer from './reducers/anecdotesReducer';

const store = createStore(anecdotesReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
