import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {
    content: "first note",
    important: true,
    id: 1
  },
  {
    content: "second note",
    important: false,
    id: 2
  }
]

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId()
      })
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }

      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(note => {
        return note.id === id
          ? changedNote
          : note
      })
    }
  }
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer
