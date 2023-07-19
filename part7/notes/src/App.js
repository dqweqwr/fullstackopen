import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
  // useParams,
  useNavigate 
} from "react-router-dom"
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin("asdf")
    navigate("/")
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>username: <input type="text" /></div>
        <div>password: <input type="password" /></div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <h2>Notes app</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab possimus inventore consectetur officia ea provident dolor sit quam odio veniam!</p>
    </div>
  )
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <li>Bob</li>
        <li>Jeff</li>
        <li>Charlie</li>
      </ul>
    </div>
  )
}

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? "important" : "not important"}</strong>
      </div>
    </div>
  )
}

const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const login = (user) => {
    setUser(user)
  }
  
  const match = useMatch("/notes/:id")
  console.log(match)
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <>
      <div>
        <Link className="link" to="/">home</Link>
        <Link className="link" to="/notes">notes</Link>
        <Link className="link" to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link className="link" to="/login">login</Link>
        }
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes notes={notes}/>} />
        <Route path="/notes/:id" element={<Note note={note}/>} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" /> }/>
        <Route path="/login" element={<Login onLogin={login} />} />
      </Routes>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);

