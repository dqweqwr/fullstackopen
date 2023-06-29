const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? "make not important" : "make important"

  const color = note.important
    ? "red" : "black"

  return (
    <li>
      {note.content}
      <button style={{color: color}} onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
