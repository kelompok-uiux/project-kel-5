"use client"
import { useState } from "react"
import { IconContext } from "react-icons"
import { SiPinboard } from "react-icons/si"
import { TiTrash } from "react-icons/ti"
import { MdContentCopy } from "react-icons/md"
import React from "react"
import { useSelector } from "react-redux"
import { removeNote, toggleNotePin } from "@/features/note/noteSlice"
import { FaTrash } from "react-icons/fa"
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai"
import { useAppDispatch } from "@/hooks/hooks"

interface NoteProps {
  newNote: (component: any) => any
}

type NoteData = {
  noteId?: string
  index?: number
  title?: string
  content?: string
  pinned?: boolean
  modalIsOpen?: boolean
  clickModal: () => void
  noteImage?: string
  optionColor?: string
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

// (component: string) => any
const NoteCard = (props: NoteData) => {
  const dispatch = useAppDispatch()
  const [pinned, setPinned] = useState(props.pinned)

  const handleDeleteNote = () => {
    dispatch(removeNote(props.noteId))
  }

  const handlePin = () => {
    setPinned(!pinned)
    dispatch(toggleNotePin(props.noteId))
  }

  const noteSelector = useSelector((state: any) => {
    return state.note.notes.find((note: any) => note.id === props.noteId)
  })

  let note: any
  if (noteSelector) {
    note = noteSelector
  }

  const [selectedImage, setSelectedImage] = useState(props.noteImage)

  const selectImage = (image: any) => {
    setSelectedImage(image)
    // Additional logic to handle the background change can be implemented here
  }

  const imageStyle: any = {
    backgroundImage: `${
      selectedImage !== "bg-white" ? `url(${selectedImage}` : "bg-white"
    }`,
    backgroundSize: "cover",
  }

  const kosongStyle: any = {}

  return (
    <div
      style={
        imageStyle.backgroundImage !== `bg-white` ? imageStyle : kosongStyle
      }
      className={`${
        imageStyle.backgroundImage === `bg-white` ? "bg-white" : ""
      } relative flex w-72 cursor-pointer flex-col rounded-md border border-gray-700/30 text-gray-700 hover:shadow-lg`}
      onClick={() => props.clickModal()}
      /*className="relative flex w-72 flex-col rounded-md border hover:shadow-lg cursor-pointer border-gray-700/30 text-gray-700"
      onClick={() => props.clickModal()}*/
    >
      <h5 className="text-blue-gray-900 m-4 line-clamp-3 block text-ellipsis font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
        {props.title}
      </h5>

      <p
        dangerouslySetInnerHTML={{ __html: props.content!.length >= 250 ?  props.content?.slice(0, 250) + "...":  props.content as any }}
        className="ql-editor block font-sans text-base leading-relaxed text-inherit antialiased"
      ></p>

      <div className="relative flex items-center justify-start p-4">
        <div className="z-20 p-4">
          <FaTrash
            onClick={handleDeleteNote}
            className="h-4 w-4 cursor-pointer text-black/75  hover:text-blue-500"
          />
        </div>
        <div>
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
      </div>
    </div>
  )
}

export default NoteCard
