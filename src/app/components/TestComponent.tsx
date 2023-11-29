"use client"
import { addNote } from "@/features/note/noteSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import React, { useState } from "react"
import AddNoteBar from "./AddNoteBar"
import NoteCard from "./NoteCard"
import NoteCardModal from "./NoteCardModal"

type ModalState = {
  noteId?: string
  show: boolean
}

const TestComponent = () => {
  const dispatch = useAppDispatch()

  const filter = useAppSelector((state) => state.note.filterString)
  console.log("filterString:", filter)

  const notes = useAppSelector((state) => state.note.notes)
  const [showModal, setShowModal] = useState({
    show: false,
  } as ModalState)

  // Filter notes based on the filter value
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(filter.toLowerCase()) ||
      note.content.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className={`text-black`}>
      <AddNoteBar />
      <div className="flex flex-col">
        {filteredNotes.map((note, index) => {
          return (
            <>
              <div className="mb-8">
                <NoteCard
                  index={index}
                  title={note.title}
                  content={note.content}
                  clickModal={() =>
                    setShowModal({ noteId: note.id, show: true })
                  }
                />

                {showModal.show ? (
                  <div className="flex ">
                    <NoteCardModal
                      modalIsOpen={showModal}
                      onClose={() =>
                        setShowModal({ ...showModal, show: false })
                      }
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default TestComponent
