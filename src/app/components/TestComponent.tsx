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




  return (
    <div className={`text-black`}>
      <AddNoteBar />
      
      {notes.map((note, index) => {
        return (
          <>
          
          <div    >
            <NoteCard index={index} title={note.title} content={note.content} 
              clickModal={() => setShowModal(true)}/>
                  
            <div className="flex "  >
              <NoteCardModal lastEdited={note.lastEdited} pinned={note.pinned} id={note.id} index={index} title={note.title} content={note.content} 
               modalIsOpen={showModal}
              onClose={() => setShowModal(false)}/>
            </div>
          </div>
        
          </>
        )
      })}
    </div>
  )
}

export default TestComponent
