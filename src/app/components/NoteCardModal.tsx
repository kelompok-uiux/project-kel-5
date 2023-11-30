"use client"
import {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import dynamic from "next/dynamic"
import moment from "moment"
import { useSelector } from "react-redux"

import "react-quill/dist/quill.snow.css"
import { useAppDispatch } from "@/hooks/hooks"
import {
  changeNoteImage,
  changeOptionImage,
  editNote,
  removeNote,
  toggleNotePin,
} from "@/features/note/noteSlice"
import { FaTrash, FaPalette } from "react-icons/fa"
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai"
import CSS from "csstype"
import React from "react"
import { sendMessage } from "@/utils/sendMessage"
import CursorSVG from "./icons/CursorSVG"
import gsap from "gsap"

type ModalProps = {
  modalIsOpen?: {
    noteId?: string
    show: boolean
  }

  onClose: () => void
}

type ImageData = {
  name: string
  image: string
}

type OptionColorData = {
  color: string
}

const NoteCardModal = (modalProps: ModalProps) => {
  const dispatch = useAppDispatch()

  const noteSelector = useSelector((state: any) => {
    return state.note.notes.find(
      (note: any) => note.id === modalProps.modalIsOpen?.noteId
    )
  })

  /// background
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
      image:
        "https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg",
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

  let note: any
  if (noteSelector) {
    note = noteSelector
  }

  // gsap animation
  const modalRef = useRef(null)

  useLayoutEffect(() => {
    gsap.to(modalRef.current, {
      xPercent: -50,
      left: "50%",
      yPercent: -50,
      top: "50%",
      position: "absolute",
      ease: "power3.out",
    })
  }, [])

  const date = new Date(note.lastEdited ? note.lastEdited : "")
  const [lastedited, setLastEdited] = useState(date)
  const [backgroundPick, setBackgroundPick] = useState(false)
  const [selectedImage, setSelectedImage] = useState(note.noteImage)

  const [selectedOptionColor, setSelectedOptionColor] = useState(
    note.optionColor
  )
  const [value, setValue] = useState(note.content)
  const [completedTyping, setCompletedTyping] = useState(false)
  const [loading, setLoading] = useState(false)

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  )

  // editing title
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(note.title)
  const [pinned, setPinned] = useState(note.pinned)

  if (!modalProps.modalIsOpen?.show) {
    // jika modalNotecard tidak open return null
    return null
  }

  const myColors = [
    "purple",
    "#785412",
    "#452632",
    "#856325",
    "#963254",
    "#254563",
    "#e5e7eb",
    "#f1f5f9",
    "#fafafa",
    "#f9fafb",

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
  }

  const handleProcedureContentChange = async (content: any) => {
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
    modalProps.onClose()
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

  const promptGPT = "@ChatGPT "

  const handleChatGPT = async (e: any) => {
    if (e.key === "Enter") {
      if (value.includes(promptGPT)) {
        let index = value.indexOf(promptGPT) + promptGPT.length
        let promptText = value.slice(index)
        setLoading(true)
        let originalContent = value.slice(0, value.indexOf(promptGPT))
        setValue(originalContent)

        const data = await sendMessage(promptText)
        const gptResponse = await data.data.openai.message[1].message

        let i = 0
        setCompletedTyping(false)
        const intervalId = setInterval(() => {
          setValue(originalContent + gptResponse.slice(0, i))

          i++

          if (i > gptResponse.length) {
            clearInterval(intervalId)
            setCompletedTyping(true)
          }
        }, 20)
        setLoading(false)
      }
    }
  }

  const imageStyle: CSS.Properties = {
    backgroundImage: `${
      selectedImage !== "bg-white" ? `url(${selectedImage}` : "bg-white"
    }`,
    backgroundSize: "cover",
  }

  const kosongStyle: CSS.Properties = {}

  return (
    // inset-0 items-center justify-center
    <div
      className="fixed inset-0 z-30  flex flex-col  overflow-y-auto  bg-black bg-opacity-25 "
      id="wrapper"
      onClick={handleClose}
    >
      <div
        role="note-card"
        style={
          imageStyle.backgroundImage !== `bg-white` ? imageStyle : kosongStyle
        }
        className={`m-4 max-w-xl rounded-b-xl  rounded-t-xl  pt-2 ${
          imageStyle.backgroundImage === `bg-white` ? "bg-white" : ""
        }  shadow-lg`}
        ref={modalRef}
      >
        <div className="pl-6 pr-4 pt-2 ">
          <div
            className="items-ce<nter flex justify-between px-2"
            role="title-div"
            onClick={handleClick}
          >
            {isEditing ? (
              <input
                size={47}
                className="mb-2 bg-transparent text-xl	font-bold outline-none"
                type="text"
                value={text}
                role="title-input"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ) : (
              <span className="mb-2 text-xl font-bold">{text}</span>
            )}

            <AiFillPushpin
              title="Pin note"
              role="pin-false"
              onClick={handlePin}
              className={`h-6 w-6 cursor-pointer text-black/75 hover:text-blue-500 ${
                !pinned && "hidden"
              }`}
            />
            <AiOutlinePushpin
              title="Pin note"
              role="pin-true"
              onClick={handlePin}
              className={`h-6 w-6 cursor-pointer text-black/75 hover:text-blue-500 ${
                pinned && "hidden"
              }`}
            />
          </div>

          <div className="mt-1 ">
            <ReactQuill
              theme="snow"
              placeholder="reactQuill"
              modules={modules}
              formats={formats}
              value={value}
              onChange={handleProcedureContentChange}
              onKeyDown={handleChatGPT}
              className="bg-white"
            />
          </div>
        </div>
        <div className="flex justify-between  px-6 pt-2">
          {loading && (
            <div className=" mb-4 translate-x-1/2 translate-y-1/2  transform">
              <div className="h-4 w-4 animate-spin  rounded-full border-2 border-solid border-blue-400 border-t-transparent"></div>
            </div>
          )}

          <span className="mb-2  ml-auto mr-2 inline-block px-3  py-1 text-sm text-gray-700">
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

          <div className="ml-auto px-6  pb-1 pt-1 ">
            <button
              role="close-modal"
              className="justify-end rounded bg-transparent px-4 py-2  font-semibold text-slate-900  hover:border-transparent hover:bg-slate-500/10"
              onClick={() => modalProps.onClose()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {backgroundPick && images ? (
        <div className=" w-84 relative top-72 z-10 mt-72 flex  h-auto flex-col justify-center overflow-hidden rounded-xl bg-gray-50 bg-opacity-25 ">
          <div className="mx-auto max-w-7xl">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg opacity-25 blur  "></div>
              <div className="items-top relative flex flex-col justify-start space-x-6 rounded-lg bg-white px-7 py-2 leading-none ring-1 ring-gray-900/5">
                <div className="flex items-center justify-center space-x-2  py-2">
                  {optionColors.length !== 0
                    ? (optionColors.map((color: OptionColorData) => {
                        // ${color.color == "bg-white" && selectedOptionColor !== "bg-white" ? "border-2 border-slate-200":""}

                        return (
                          <>
                            <button
                              role="optionColor"
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
                      }) as ReactNode)
                    : ""}
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
                            role="change-background"
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
