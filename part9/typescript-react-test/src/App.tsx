import React, { useEffect, useState } from "react";
import { getAllNotes, createNote } from "./noteService";
import { Note } from "./types";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes().then((data) => setNotes(data));
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNote({ content: newNote }).then((data) =>
      setNotes(notes.concat(data)),
    );
    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
