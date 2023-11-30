const { createSlice, configureStore, nanoid } = require("@reduxjs/toolkit")
import noteReducer, { changeNoteImage, changeOptionImage, removeNote, toggleNotePin } from "@/features/note/noteSlice"
import { Note , NoteState, editNote} from "@/features/note/noteSlice"


describe("noteModal reducer", () => {

  

  test('should return the initial state', () => {
    expect(noteReducer(undefined, {type: undefined})).toEqual(
      {notes: [],
        filterString: "",}
    )

  })

  test(' note should have  updated ', () => {
    const previousState: NoteState ={
    notes:  [
      { 
        id: "1",
        title: "Judul Note",
        content: "Content Note",
        pinned: true,
        lastEdited: "11-06-2023",
        modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
        optionColor: "#faafa8"
       }
    ],
    filterString: ""
  }
  const newDate = new Date().toISOString()
  const noteBaru =  {
    id: "1",
    title: "Judul Note Terbaru",
    content: "Content Note Terbaru",
    pinned: true,
    lastEdited: new Date().toISOString().slice(0,10),
    modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
        optionColor: "#faafa8"


  }

    expect(noteReducer(previousState, editNote(
     noteBaru
    ))).toEqual({notes: [noteBaru,], filterString: "",});
    
  })

  test('note should have  removed ', () => {
    const previousState: NoteState ={
    notes:  [
      { 
        id: "1",
        title: "Judul Note",
        content: "Content Note",
        pinned: true,
        lastEdited: "11-06-2023",
        modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
        optionColor: "#faafa8"
       }
    ],
    filterString: ""
  }
  const newDate = new Date().toISOString()
  const noteBaru =  {
    id: "1",
    title: "Judul Note Terbaru",
    content: "Content Note Terbaru",
    pinned: true,
    lastEdited: new Date().toISOString().slice(0,10),
    modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
        optionColor: "#faafa8"


  }

    expect(noteReducer(previousState, removeNote(
     noteBaru.id
    ))).toEqual({notes: [], filterString: "",});
    
  })



  test('note should have  pinned ', () => {
    const previousState: NoteState ={
    notes:  [
      { 
        id: "1",
        title: "Judul Note",
        content: "Content Note",
        pinned: false,
        lastEdited: "11-06-2023",
        modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
        optionColor: "#faafa8"
       }
    ],
    filterString: ""
  }
  const newDate = new Date().toISOString()
  const noteBaru =  {
    id: "1",
    title: "Judul Note",
        content: "Content Note",
    pinned: true,
    lastEdited: "11-06-2023",
    modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
        optionColor: "#faafa8"


  }

    expect(noteReducer(previousState, toggleNotePin(
     noteBaru.id
    ))).toEqual({notes: [noteBaru], filterString: "",});
    
  })



  test('note option color should have  changed ', () => {
    const previousState: NoteState ={
    notes:  [
      { 
        id: "1",
        title: "Judul Note",
        content: "Content Note",
        pinned: false,
        lastEdited: "11-06-2023",
        modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
        optionColor: "#faafa8"
       }
    ],
    filterString: ""
  }
  const newDate = new Date().toISOString()
  const noteBaru =  {
    id: "1",
    title: "Judul Note",
        content: "Content Note",
    pinned: false,
    lastEdited: "11-06-2023",
    modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
        optionColor: "#b4ddd3"


  }

    expect(noteReducer(previousState, changeOptionImage(
      {color: "#b4ddd3", id: noteBaru.id}
    ))).toEqual({notes: [noteBaru], filterString: "",});
    
  })


  test('note image  should have  changed ', () => {
    const previousState: NoteState ={
    notes:  [
      { 
        id: "1",
        title: "Judul Note",
        content: "Content Note",
        pinned: false,
        lastEdited: "11-06-2023",
        modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
        optionColor: "#faafa8"
       }
    ],
    filterString: ""
  }
  const newDate = new Date().toISOString()
  const noteBaru =  {
    id: "1",
    title: "Judul Note",
        content: "Content Note",
    pinned: false,
    lastEdited: "11-06-2023",
    modalIsOpen: true,
        noteImage: "https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg",
        optionColor: "#faafa8"

  }

    expect(noteReducer(previousState, changeNoteImage(
      {color: "https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg", id: noteBaru.id}
    ))).toEqual({notes: [noteBaru], filterString: "",});
    
  })


})
