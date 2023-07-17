import { createSlice } from "@reduxjs/toolkit"

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
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
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const {
  createNote,
  toggleImportanceOf,
  appendNote,
  setNotes
} = noteSlice.actions

export default noteSlice.reducer
