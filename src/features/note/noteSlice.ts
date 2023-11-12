import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Note = {
  title: string
  content: string
  pinned: boolean
  modalIsOpen: boolean
}

type NoteState = {
  notes: Note[]
}

const initialState: NoteState = {
  notes: [],
}

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      action.payload.content =  action.payload.content.replace('<p>', '')
      action.payload.content = action.payload.content.replace('</p>', '')
      state.notes.push(action.payload)
    },
    toggleModal: (state, action: PayloadAction<number>) => {
      state.notes[action.payload].modalIsOpen =
        !state.notes[action.payload].modalIsOpen
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes.splice(action.payload, 1)
    },
    editNote: (
      state,
      action: PayloadAction<{ index: number; type: string; change: string }>
    ) => {
      // Sori gais :) gapaham hehe
      (state.notes[action.payload.index] as any)[action.payload.type] =
        action.payload.change
    },
    toggleNotePin: (state, action: PayloadAction<number>) => {
      state.notes[action.payload].pinned = !state.notes[action.payload].pinned
    },
  },
})

export const { addNote, toggleModal, removeNote, editNote, toggleNotePin } =
  noteSlice.actions
export default noteSlice.reducer
