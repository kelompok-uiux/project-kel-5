const { createSlice, configureStore, nanoid } = require("@reduxjs/toolkit")

describe("note reducer", () => {
  let noteSlice
  let store

  beforeEach(() => {
    noteSlice = createSlice({
      name: "note",
      initialState: {
        notes: [],
      },
      reducers: {
        addNote: (state, action) => {
          action.payload.content = action.payload.content.replace("<p>", "")
          action.payload.content = action.payload.content.replace("</p>", "")
          action.payload.id = nanoid()
          action.payload.lastEdited = new Date().toISOString()
          action.payload.noteImage = "bg-white"
          action.payload.optionColor = "bg-white"
          state.notes.push(action.payload)
        },
      },
    })

    store = configureStore({
      reducer: {
        note: noteSlice.reducer,
      },
    })
  })

  it("cek apakah state notes berhasil diinisialisasi", () => {
    expect(store.getState().note.notes.length).toEqual(0)
  })

  it("cek apakah method addNote dapat menambahkan note baru ke state notes", () => {
    const note = {
      title: "Test Note",
      content: "This is a test note",
      pinned: false,
    }

    store.dispatch(noteSlice.actions.addNote(note))
    expect(store.getState().note.notes.length).toEqual(1)
  })
})
