"use client"
import { useState } from "react";
import { IconContext } from "react-icons";
import {SiPinboard }from "react-icons/si";
import {TiTrash} from 'react-icons/ti'
import {MdContentCopy} from 'react-icons/md'
import React from "react";
interface NoteProps {
  newNote: (component: any) => any
}

type  NoteData =  {
  index?: number
  title?: string
  content?: string
  pinned?: boolean
  modalIsOpen?: boolean
  clickModal: () =>  void 
}


// (component: string) => any
const NoteCard = (
  props: NoteData 
) => {



  return (
    <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md py-4" onClick={() => props.clickModal()} >
      <div className="p-5" >
        <div className="flex flex-row justify-between"  >
          
          <h5 className="mb-4 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
           {props.title}
          </h5>
        
        
        </div>
        
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased ">
          {props.content}
        </p>

        
   
      </div>
  </div>
  )
}

export default NoteCard;