"use client"
import { addNote } from "@/features/note/noteSlice"
import { useAppDispatch, useAppSelector } from "@/hooks"
import React from "react"

const dummyNote = {
  title: "test",
  content: "test",
  pinned: false,
  modalIsOpen: false,
}

const TestComponent = () => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector((state) => state.note.notes)
  return (
    <div className="text-black">
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
          <div key={note.content + index}>
            <p className="text-xl font-bold">{note.title}</p>
            <p>{note.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default TestComponent
