"use client"
import React, { useState, useEffect, useMemo } from "react"
import "react-quill/dist/quill.snow.css"
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai"
import { FiPlus } from "react-icons/fi"
import { Note, addNote } from "@/features/note/noteSlice"
import { useAppDispatch } from "@/hooks"
import dynamic from "next/dynamic"

const emptyNote = {
  title: "",
  content: "",
  pinned: false,
  modalIsOpen: false,
}

const myColors = [
  "purple",
  "#785412",
  "#452632",
  "#856325",
  "#963254",
  "#254563",
  "white",
]

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: myColors }],
    [{ background: myColors }],
  ],
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "image",
  "background",
  "align",
]

const AddNoteBar = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )
  const [newNote, setNewNote] = useState<Note>(emptyNote)
  const [isFocused, setIsFocused] = useState(false)
  const dispatch = useAppDispatch()

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleAddNote = () => {
    console.log(newNote)
    if (!newNote.title || !newNote.content || newNote.content === "<p><br></p>")
      return
    setIsFocused(false)
    setNewNote(emptyNote)
    dispatch(addNote(newNote))
  }

  const handlePin = () => {
    setNewNote({ ...newNote, pinned: !newNote.pinned })
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const rte = document.getElementById("rich-text-editor")
      if (rte && !rte.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }

    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div className="relative px-4">
      <div
        style={{
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 3px rgba(60,64,67,0.149)",
        }}
        className="mx-auto max-w-prose"
      >
        {isFocused ? (
          <div id="rich-text-editor">
            <div className="flex items-center space-x-2 border-x border-t border-black/20 pr-4">
              <input
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
                className="w-full border-black/20 p-4 text-lg font-medium outline-none placeholder:italic placeholder:text-black/50"
                placeholder="Title"
              />
              <AiFillPushpin
                title="Pin note"
                onClick={handlePin}
                className={`h-6 w-6 cursor-pointer text-black/75 hover:text-blue-500 ${
                  !newNote.pinned && "hidden"
                }`}
              />
              <AiOutlinePushpin
                title="Pin note"
                onClick={handlePin}
                className={`h-6 w-6 cursor-pointer text-black/75 hover:text-blue-500 ${
                  newNote.pinned && "hidden"
                }`}
              />
              <FiPlus
                onClick={handleAddNote}
                title={
                  newNote.title && newNote.content
                    ? "Add note"
                    : "Note is empty"
                }
                className={`h-6 w-6 cursor-pointer text-black/75 hover:text-blue-500`}
              />
            </div>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={newNote.content}
              onChange={(value: any) =>
                setNewNote({ ...newNote, content: value })
              }
              placeholder="Take a note..."
            />
          </div>
        ) : (
          <div className="flex items-center border border-black/20 pr-4">
            <input
              onFocus={handleFocus}
              className="w-full px-4 py-2 outline-none placeholder:font-medium placeholder:text-black/50"
              placeholder="Take a note..."
            />
            {newNote.pinned ? (
              <AiFillPushpin
                title="Pin note"
                onClick={handlePin}
                className="h-6 w-6 cursor-pointer text-black/75 hover:text-blue-500"
              />
            ) : (
              <AiOutlinePushpin
                title="Pin note"
                onClick={handlePin}
                className="h-6 w-6 cursor-pointer text-black/75 hover:text-blue-500"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddNoteBar
