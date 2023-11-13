"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import moment from "moment"

import "react-quill/dist/quill.snow.css"
import { useAppDispatch } from "@/hooks"
import { editNote, removeNote, toggleNotePin } from "@/features/note/noteSlice"
import { FaTrash } from "react-icons/fa"
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai"

type ModalProps = {
  id?: string
  index?: number
  title: string
  content: string
  pinned: boolean
  modalIsOpen?: boolean
  lastEdited?: string
  onClose: () => void
}

const NoteCardModal = (modalProps: ModalProps) => {
  if (!modalProps.modalIsOpen) {
    return null
  }
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )
  const dispatch = useAppDispatch()
  const date = new Date(modalProps.lastEdited ? modalProps.lastEdited : "")
  const [lastedited, setLastEdited] = useState(date)

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
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
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

  const [value, setValue] = useState(modalProps.content)

  // editing title
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(modalProps.title);
  const [pinned, setPinned] = useState(modalProps.pinned);

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleChange = (event: any) => {
    setText(event.target.value)
    dispatch(
      editNote({
        id: modalProps.id,
        title: text,
        content: value,
        pinned: pinned,
      })
    )
  }

  const handleBlur = () => {
    setIsEditing(false)

    // Save the changes or perform any required actions here
  }

  const handleProcedureContentChange = (content: any) => {
    setValue(content)

    dispatch(
      editNote({
        id: modalProps.id,
        title: text,
        content: content,
        pinned: pinned,
      })
    )
  }

  const handlePin = () => {
    setPinned(!pinned)
    dispatch(toggleNotePin(modalProps.id));
  }

  const handleDeleteNote = () => {
      
      dispatch(removeNote(modalProps.id))
  }

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      modalProps.onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-10  flex items-center justify-center overflow-y-auto  bg-black bg-opacity-25 "
      id="wrapper"
      onClick={handleClose}
    >
      <div className="m-4 max-w-xl rounded-xl bg-white p-2 shadow-lg">
        <div className="px-6 py-2  ">
          <div className="flex justify-between items-center" onClick={handleClick}>
            {isEditing ? (
              <input
                size={35}
                className="mb-2 text-xl font-bold"
                type="text"
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ) : (
              <span className="mb-2 text-xl font-bold">{text}</span>
            )}
            
              <AiFillPushpin
                title="Pin note"
                onClick={handlePin}
              className={`h-6 w-6 cursor-pointer text-black/75 hover:text-blue-500 ${
                !pinned && "hidden"
              }`}
               />
              <AiOutlinePushpin 
              title="Pin note"
              onClick={handlePin}
              className={`h-6 w-6 cursor-pointer text-black/75 hover:text-blue-500 ${
               pinned && "hidden"
              }`}
              />
            
          
          </div>

          <div className="mt-2 ">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={value}
              onChange={handleProcedureContentChange}
            />
          </div>
        </div>
        <div className="flex justify-end  px-6 pt-2">
          <span className="mb-2   mr-2 inline-block px-3  py-1 text-sm text-gray-700">
            Edited {moment(lastedited).format(" MMMM D Y hh:mm")}
          </span>
        </div>
        {/* border-t border-solid border-t-white border-1 */}
        <div className="flex  items-center justify-start  bg-white">
          <div className="p-6">
            <FaTrash 
             onClick={handleDeleteNote}
            className="h-6 w-6 cursor-pointer text-black/75  hover:text-blue-500"
            />
          </div>

          <div className="ml-auto px-6   pt-1 ">
            <button
              className="justify-end rounded bg-transparent px-4 py-2  font-semibold text-slate-900  hover:border-transparent hover:bg-gray-100"
              onClick={() => modalProps.onClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteCardModal
