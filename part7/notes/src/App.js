import { Routes, Route, Navigate, useMatch } from "react-router-dom"
import React, { useState } from 'react';

import Notification from "./components/Notification";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Note from "./components/Note";
import Users from "./components/Users";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

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
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  
  const match = useMatch("/notes/:id")
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <div className="container">
      <Notification message={message} />
      <Menu user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes notes={notes}/>} />
        <Route path="/notes/:id" element={<Note note={note}/>} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" /> }/>
        <Route path="/login" element={<Login onLogin={login} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App
