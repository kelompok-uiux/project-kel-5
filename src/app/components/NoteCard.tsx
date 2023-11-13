"use client"
import { useState } from "react"
import { IconContext } from "react-icons"
import { SiPinboard } from "react-icons/si"
import { TiTrash } from "react-icons/ti"
import { MdContentCopy } from "react-icons/md"
import React from "react"
interface NoteProps {
  newNote: (component: any) => any
}

type NoteData = {
  index?: number
  title?: string
  content?: string
  pinned?: boolean
  modalIsOpen?: boolean
  clickModal: () => void
  noteImage?: string
  optionColor?: string
}

// (component: string) => any
const NoteCard = (props: NoteData) => {
  return (
    <div
      className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border py-4 text-gray-700 shadow-md"
      onClick={() => props.clickModal()}
    >
      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h5 className="text-blue-gray-900 mb-4 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
            {props.title}
          </h5>
        </div>

        <p
          dangerouslySetInnerHTML={{ __html: props.content as any }}
          className="block font-sans text-base font-light leading-relaxed text-inherit antialiased "
        ></p>
      </div>
    </div>
  )
}

export default NoteCard