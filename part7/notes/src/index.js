import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

const Home = () => {
  <div>
    <h2>Notes</h2>
  </div>
}

const Notes = () => {
  <div>
    <h2>Notes</h2>
  </div>
}

const Users = () => {
  <div>
    <h2>Users</h2>
  </div>
}

const App = () => {
  const [page, setPage] = useState("home")

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === "home") {
      return <Home />
    } else if (page === "notes") {
      return <Notes />
    } else if (page === "users") {
      return <Users />
    } 
  }

  return (
    <div>
      <div>
        <a href="" className="link" onClick={toPage("home")}>home</a>
        <a href="" className="link" onClick={toPage("notes")}>notes</a>
        <a href="" className="link" onClick={toPage("users")}>users</a>
        {content()}
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

