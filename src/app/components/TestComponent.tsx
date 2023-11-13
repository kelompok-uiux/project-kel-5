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

type ModalState = {
  noteId?: string
  show: boolean
}

const TestComponent = () => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector((state) => state.note.notes)
  const [showModal, setShowModal] = useState({
    show: false,
  } as ModalState)

  return (
    <div className={`text-black`}>
      <AddNoteBar />
      <div className="flex flex-col">
        {notes.map((note, index) => {
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
                      // lastEdited={note.lastEdited}
                      // pinned={note.pinned}
                      // id={note.id}
                      // index={index}
                      // title={note.title}
                      // content={note.content}
                      modalIsOpen={showModal}
                      // noteImage={note.noteImage}
                      // optionColor={note.optionColor}
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
