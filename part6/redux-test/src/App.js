import { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => {
    console.log(state)
    return state
  })

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ""
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note => {
          return (
            <li
              key={note.id}
              onClick={() => toggleImportance(note.id)}
            >
              {note.content}
              {" "}
              <strong>{note.important ? "important" : "not important"}</strong>
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default App;
