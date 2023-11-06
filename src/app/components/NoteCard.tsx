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
// (component: string) => any
const NoteCard = (
  // newNote: 
  {newNote}: NoteProps
) => {
  const [isHover, setIsHover] = useState(false);

  const hoverHandler = (event: any) => {
    setIsHover(true);
  }

  const notHoverHandler = (event:any) => {
    setIsHover(false);
  }



  return (
    <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md py-4" onMouseOver={hoverHandler} onMouseOut={notHoverHandler} >
      <div className="p-5" >
        <div className="flex flex-row justify-between"  >
          
          <h5 className="mb-4 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Judul Note
          </h5>
          {
            isHover?
            <IconContext.Provider
              value={{className:"rounded-full bg-gray-100 w-8 h-8"}}
            >
                   <SiPinboard/>
            </IconContext.Provider>
          
            
            : ''

          }
        
        </div>
        
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased ">
          Isi Note
        </p>

        
        {
        isHover ? (
        <div className="flex flex-row justify-end">
          {/* onClick={() => newNote()} */}
         
                <div  onClick={() => newNote(NoteCard)} >
                  <IconContext.Provider
                          value={{className: "w-6 h-6 mr-4  mt-1",}}
                        >
                      <MdContentCopy/>
                  </IconContext.Provider>
                </div>
                <IconContext.Provider
                  value={{className: "w-8 h-8"}}
                >
                <TiTrash/> 

                </IconContext.Provider>
          </div>
        )
        : ""
      }
      </div>
  </div>
  )
}

export default NoteCard;