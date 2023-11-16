"use client"
import {
  Fragment,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import dynamic from "next/dynamic"
import moment from "moment"
import ReactQuill from "react-quill"
import { createPopper } from "@popperjs/core"
import { useSelector } from "react-redux"

import "react-quill/dist/quill.snow.css"
import { useAppDispatch } from "@/hooks/hooks"
import {
  Note,
  NoteState,
  changeNoteImage,
  changeOptionImage,
  editNote,
  removeNote,
  toggleNotePin,
} from "@/features/note/noteSlice"
import { FaTrash, FaPalette } from "react-icons/fa"
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai"
import CSS from "csstype"
import music from "../../../public/backgroundImageNote/music.svg"
import { Listbox, Popover, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import React from "react"

type ModalProps = {
  // id?: string
  // index?: number
  // title: string
  // content: string
  // pinned: boolean
  modalIsOpen?: {
    noteId?: string
    show: boolean
  }
  // lastEdited?: string
  onClose: () => void
  // noteImage?: string
  // optionColor?: string
}

type ImageData = {
  name: string
  image: string
}

const images: ImageData[] = [
  {
    name: "default",
    image: "bg-white",
  },
  {
    name: "recipes",
    image:
      "https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg",
  },
  {
    name: "places",
    image:
      "https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg",
  },
  {
    name: "groceries",
    image:
      "https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg",
  },
  {
    name: "food",
    image: "https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg",
  },
  {
    name: "music",
    image:
      "https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg",
  },
  {
    name: "notes",
    image:
      "https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg",
  },
  {
    name: "travel",
    image:
      "https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
  },
  {
    name: "video",
    image:
      "https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg",
  },
  {
    name: "celebration",
    image:
      "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
  },
]

type OptionColorData = {
  color: string
}

const optionColors = [
  {
    color: "bg-white",
  },
  {
    color: "bg-[#faafa8]",
  },
  {
    color: "bg-[#f39f76]",
  },
  {
    color: "bg-[#fff8b8]",
  },
  {
    color: "bg-[#e2f6d3]",
  },
  {
    color: "bg-[#b4ddd3]",
  },
  {
    color: "bg-[#d4e4ed]",
  },
  {
    color: "bg-[#aeccdc]",
  },
  {
    color: "bg-[#d3bfdb]",
  },
  {
    color: "bg-[#f6e2dd]",
  },
  {
    color: "bg-[#e9e3d4]",
  },
  {
    color: "bg-[#efeff1]",
  },
]

const NoteCardModal = (modalProps: ModalProps) => {
  if (!modalProps.modalIsOpen) {
    return null
  }

  const dispatch = useAppDispatch()

  const noteSelector = useSelector((state: any) => {
    return state.note.notes.find(
      (note: any) => note.id === modalProps.modalIsOpen?.noteId
    )
  })

  let note: any
  if (noteSelector) {
    note = noteSelector
  }

  const date = new Date(note.lastEdited ? note.lastEdited : "")
  const [lastedited, setLastEdited] = useState(date)
  const [backgroundPick, setBackgroundPick] = useState(false)
  const [selectedImage, setSelectedImage] = useState(note.noteImage)
  const [selectedOptionColor, setSelectedOptionColor] = useState(
    note.optionColor
  )
  const [value, setValue] = useState(note.content)

  // editing title
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(note.title)
  const [pinned, setPinned] = useState(note.pinned)

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

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleChange = (event: any) => {
    setText(event.target.value)
    dispatch(
      editNote({
        id: note.id,
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
        id: note.id,
        title: text,
        content: content,
        pinned: pinned,
      })
    )
  }

  const handlePin = () => {
    setPinned(!pinned)
    dispatch(toggleNotePin(note.id))
  }

  const handleDeleteNote = () => {
    dispatch(removeNote(note.id))
  }

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      modalProps.onClose()
    }
  }

  const handleBackgroundPicker = () => {
    setBackgroundPick(!backgroundPick)
  }

  const selectImage = (image: any) => {
    setSelectedImage(image)
    // Additional logic to handle the background change can be implemented here
  }

  const handleSetSelectedOptionColor = (color: any) => {
    setSelectedOptionColor(color)
  }

  const imageStyle: CSS.Properties = {
    backgroundImage: `${
      selectedImage !== "bg-white" ? `url(${selectedImage}` : "bg-white"
    }`,
    backgroundSize: "cover",
  }

  const kosongStyle: CSS.Properties = {}
  return (
    <div
      className="fixed inset-0 z-10  flex flex-col items-center justify-center overflow-y-auto  bg-black bg-opacity-25 "
      id="wrapper"
      onClick={handleClose}
    >
      <div
        style={
          imageStyle.backgroundImage !== `bg-white` ? imageStyle : kosongStyle
        }
        className={`m-4 max-w-xl rounded-xl  pt-2 ${
          imageStyle.backgroundImage === `bg-white` ? "bg-white" : ""
        }  shadow-lg`}
      >
        <div className="pl-6 pr-4 pt-2 ">
          <div
            className="flex items-center justify-between px-2"
            onClick={handleClick}
          >
            {isEditing ? (
              <input
                size={47}
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

          <div className="mt-1 ">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={value}
              onChange={handleProcedureContentChange}
              className="bg-white"
            />
          </div>
        </div>
        <div className="flex justify-end  px-6 pt-2">
          <span className="mb-2   mr-2 inline-block px-3  py-1 text-sm text-gray-700">
            Edited {moment(lastedited).format(" MMMM D Y hh:mm")}
          </span>
        </div>
        {/* border-t border-solid border-t-white border-1 */}
        <div
          className={`flex  items-center justify-start ${selectedOptionColor}`}
        >
          <div className="px-6 ">
            <FaTrash
              onClick={handleDeleteNote}
              className="h-4 w-4 cursor-pointer text-black/75  hover:text-blue-500"
            />
          </div>

          <div>
            <FaPalette
              onClick={handleBackgroundPicker}
              className="h-4 w-4 cursor-pointer text-black/75  hover:text-blue-500"
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
      {backgroundPick && images ? (
        <div className="w-84 relative z-10  flex h-auto flex-col justify-center overflow-hidden rounded rounded-xl bg-gray-50 ">
          <div className="mx-auto max-w-7xl">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg opacity-25 blur  "></div>
              <div className="items-top relative flex flex-col justify-start space-x-6 rounded-lg bg-white px-7 py-2 leading-none ring-1 ring-gray-900/5">
                <div className="flex items-center justify-center space-x-2  py-2">
                  {
                    optionColors.map((color: OptionColorData) => {
                      // ${color.color == "bg-white" && selectedOptionColor !== "bg-white" ? "border-2 border-slate-200":""}

                      return (
                        <>
                          <button
                            className={`h-10 w-10  rounded-full border-2 ${
                              selectedOptionColor === color.color
                                ? "border-purple-500"
                                : "border-transparent"
                            }
                            ${color.color}
                            ${
                              color.color == "bg-white" &&
                              selectedOptionColor !== "bg-white"
                                ? " border-slate-300"
                                : ""
                            }
                            `}
                            onClick={() => {
                              handleSetSelectedOptionColor(color.color)
                              dispatch(
                                changeOptionImage({
                                  id: note.id,
                                  color: color.color,
                                })
                              )
                            }}
                          />
                        </>
                      )
                    }) as ReactNode
                  }
                </div>

                <div className="flex items-center">
                  <hr className="flex-grow border-t border-gray-300" />

                  <hr className="flex-grow border-t border-gray-300" />
                </div>

                <div className="flex items-center justify-center space-x-2  py-2">
                  {
                    images.map((image: ImageData) => {
                      return (
                        <>
                          <button
                            className={`h-10 w-10  rounded-full border-2 ${
                              selectedImage === image.image
                                ? "border-purple-500"
                                : "border-transparent"
                            }
                            ${
                              image.image == "bg-white" &&
                              selectedImage !== "bg-white"
                                ? " border-slate-300"
                                : ""
                            }
                            `}
                            style={{ backgroundImage: `url(${image.image})` }}
                            onClick={() => {
                              selectImage(image.image)
                              dispatch(
                                changeNoteImage({
                                  id: note.id,
                                  color: image.image,
                                })
                              )
                            }}
                          />
                        </>
                      )
                    }) as ReactNode
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  )
}

export default NoteCardModal
