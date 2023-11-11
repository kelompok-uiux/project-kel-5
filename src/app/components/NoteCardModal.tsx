"use client"
import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from "next/dynamic";


import "react-quill/dist/quill.snow.css";



 const NoteCardModal =  () => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);


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
    "Note"
  );

  

  const handleProcedureContentChange = (content: any) => {
    setValue(content);
  };


  // editing title
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Title");

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    
    // Save the changes or perform any required actions here
  };


  return (
    <div className="max-w-xl rounded shadow-lg bg-white m-4 p-4">
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
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Edited Nov 2</span>
      </div>

      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <div className="flex space-x-2">
         

        </div>
        <button className="bg-transparent hover:bg-gray-100 text-slate-900 font-semibold  py-2 px-4  hover:border-transparent rounded">
          Close
        </button>
      </div>
    </div>
  
  );
};


export default NoteCardModal;