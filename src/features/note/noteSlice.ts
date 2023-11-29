import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"

export type Note = {
  id?: string
  title: string
  content: string
  pinned: boolean
  lastEdited?: string
  modalIsOpen?: boolean
  noteImage?: string
  optionColor?: string
}

export type NoteState = {
  notes: Note[]
  filterString: string
}

const initialState: NoteState = {
  notes: [],
  filterString: "",
}

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      state.filterString = action.payload
    },
    addNote: (state, action: PayloadAction<Note>) => {
      action.payload.content = action.payload.content.replace("<p>", "")
      action.payload.content = action.payload.content.replace("</p>", "")
      action.payload.id = nanoid()
      action.payload.lastEdited = new Date().toISOString()
      action.payload.noteImage = "bg-white"
      action.payload.optionColor = "bg-white"
      state.notes.push(action.payload)
    },
    toggleModal: (state, action: PayloadAction<number>) => {
      state.notes[action.payload].modalIsOpen =
        !state.notes[action.payload].modalIsOpen
    },
    removeNote: (state, action: PayloadAction<string | undefined>) => {
      state.notes = state.notes.filter(({ id }) => id !== action.payload)
    },
    editNote: (state, action: PayloadAction<Note>) => {
      action.payload.content = action.payload.content.replace("<p>", "")
      action.payload.content = action.payload.content.replace("</p>", "")
      const { id, title, content, pinned } = action.payload
      const lastEdited = new Date().toISOString()
      const postYangMauDiedit = state.notes.find((post) => post.id === id)

      if (postYangMauDiedit) {
        postYangMauDiedit.title = title
        postYangMauDiedit.content = content
        postYangMauDiedit.lastEdited = lastEdited
        postYangMauDiedit.pinned = pinned
      }
    },
    toggleNotePin: (state, action: PayloadAction<string | undefined>) => {
      const postYangMauDiedit = state.notes.find(
        (post) => post.id === action.payload
      )

      if (postYangMauDiedit) {
        postYangMauDiedit.pinned = !postYangMauDiedit.pinned
      }
    },
    changeNoteImage: (
      state,
      action: PayloadAction<{ id: string | undefined; color: string }>
    ) => {
      const postYangMauDiedit = state.notes.find(
        (post) => post.id === action.payload.id
      )
      if (postYangMauDiedit) {
        postYangMauDiedit.noteImage = action.payload.color
      }
    },
    changeOptionImage: (
      state,
      action: PayloadAction<{ id: string | undefined; color: string }>
    ) => {
      const postYangMauDiedit = state.notes.find(
        (post) => post.id === action.payload.id
      )
      if (postYangMauDiedit) {
        postYangMauDiedit.optionColor = action.payload.color
      }
    },
  },
})

export const {
  changeFilter,
  addNote,
  toggleModal,
  removeNote,
  editNote,
  toggleNotePin,
  changeNoteImage,
  changeOptionImage,
} = noteSlice.actions
export default noteSlice.reducer
