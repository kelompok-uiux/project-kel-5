"use client"
import { addNote } from "@/features/note/noteSlice"
import { useAppDispatch, useAppSelector } from "@/hooks"
import React, { useState } from "react"
import AddNoteBar from "./AddNoteBar"
import NoteCard from "./NoteCard"
import NoteCardModal from "./NoteCardModal"

const dummyNote = {
  title: "test",
  content: "test",
  pinned: false,
  modalIsOpen: false,
}

const TestComponent = () => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector((state) => state.note.notes);
  const [showModal, setShowModal] = useState(false);


  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') {setShowModal(false)}
  }
  return (
    <div className="text-black">
      <AddNoteBar />
      <button
        className="rounded-md bg-blue-200 p-2 shadow-xl"
        onClick={() => {
          dispatch(addNote(dummyNote))
        }}
      >
        Add dummy note
      </button>

      {notes.map((note, index) => {
        return (
          <>
          
          <div     id="wrapper"  onClick={handleClose} >
            <NoteCard index={index} title={note.title} content={note.content} 
              clickModal={() => setShowModal(true)}/>
                  
            
            <NoteCardModal index={index} title={note.title} content={note.content}  modalIsOpen={showModal}
            onClose={() => setShowModal(false)}/>

          </div>
        
          </>
        )
      })}
    </div>
  )
}

export default TestComponent
