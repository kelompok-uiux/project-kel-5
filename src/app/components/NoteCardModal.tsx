"use client"
import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from "next/dynamic";
import moment from 'moment';

import "react-quill/dist/quill.snow.css";
import { useAppDispatch } from '@/hooks';
import { editNote } from '@/features/note/noteSlice';

type ModalProps = {
  id?: string 
  index?: number
  title: string
  content: string
  pinned: boolean
  modalIsOpen?: boolean
  lastEdited: string
  onClose: () => void;
}

 const NoteCardModal = ( modalProps: ModalProps) => {
  if (!modalProps.modalIsOpen)  {return null;}
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const dispatch = useAppDispatch();
  const date = new Date(modalProps.lastEdited);
  const [lastedited, setLastEdited] = useState(date);
  


  const myColors = [
    "purple",
    "#785412",
    "#452632",
    "#856325",
    "#963254",
    "#254563",
    "white"
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ 'script': 'sub'}, { 'script': 'super' }],  
      ["link", "image"],
      [{ color: myColors }],
      [{ background: myColors }]
    ]
  };

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
    "align"
  ];

  const [value, setValue] = useState(
    modalProps.content
  );

  

 


  // editing title
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(modalProps.title);

  const handleClick = () => {
    setIsEditing(true);
 
  };

  const handleChange = (event: any) => {
    setText(event.target.value);
    dispatch(editNote({id: modalProps.id, title:  text, content: value, pinned: modalProps.pinned}));
  };

  const handleBlur = () => {
    setIsEditing(false);
    
    // Save the changes or perform any required actions here
  };

  const handleProcedureContentChange = (content: any) => {
    setValue(content);
    
    dispatch(editNote({id: modalProps.id, title:  text, content: content, pinned: modalProps.pinned}))
  };


  
  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') { modalProps.onClose()}
  }
  
  return (
    <div className="bg-black bg-opacity-25 flex  fixed inset-0 z-10 overflow-y-auto  items-center justify-center " id="wrapper"  onClick={handleClose}>
      <div className="max-w-xl rounded shadow-lg bg-white m-4 p-4"  >
        <div className="px-6 py-2 ">

          <div onClick={handleClick} >
          
            {
              isEditing ? (
                <input size={35}
                className="font-bold text-xl mb-2"
                type="text"
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              ): (
                <span  className="font-bold text-xl mb-2" >{text} </span>
              )
            }

            
        </div>

        
        <div className='mt-2 '>
          <ReactQuill
            theme='snow'
            
          modules={modules}
            formats={formats}
            value={value}
            onChange={handleProcedureContentChange}
            
          /> 
            
          
        </div>
      
          
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Edited { moment(lastedited).format(' MMMM D Y hh:mm')}</span>
        </div>

        <div className="px-6 pt-4 pb-2 flex justify-between items-center">
          <div className="flex space-x-2">
          

          </div>
          <button className="bg-transparent hover:bg-gray-100 text-slate-900 font-semibold  py-2 px-4  hover:border-transparent rounded"
          onClick={() => modalProps.onClose()}>
            Close
          </button>
        </div>
      </div>

      </div>
  
  );
};


export default NoteCardModal;