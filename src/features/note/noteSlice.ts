import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export type Note = {
  id: string
  title: string
  content: string
  pinned: boolean
  lastEdited?: string
  modalIsOpen?: boolean
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
      action.payload.id = nanoid()
      action.payload.lastEdited = new Date().toISOString()
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
      action: PayloadAction<Note>
    ) => {
      action.payload.content =  action.payload.content.replace('<p>', '')
      action.payload.content = action.payload.content.replace('</p>', '')
      const { id, title, content, pinned } = action.payload;
      const lastEdited =  new Date().toISOString()
      const postYangMauDiedit = state.notes.find(post => post.id === id);

      if (postYangMauDiedit) {
        postYangMauDiedit.title = title;
        postYangMauDiedit.content = content;
        postYangMauDiedit.lastEdited= lastEdited;
        postYangMauDiedit.pinned = pinned;
      }

      
    },
    toggleNotePin: (state, action: PayloadAction<number>) => {
      state.notes[action.payload].pinned = !state.notes[action.payload].pinned
    },
  },
})

export const { addNote, toggleModal, removeNote, editNote, toggleNotePin } =
  noteSlice.actions
export default noteSlice.reducer
