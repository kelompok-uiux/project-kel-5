"use client"
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import "react-quill/dist/quill.snow.css";

const Editor = () => {

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
      ["image"],
    ]
  };

  const formats = [
   
    "image",
  
  ];

  const [value, setValue] = useState(
    "Note"
  );
  const handleProcedureContentChange = (content: any) => {
    setValue(content);
  };

  return (
  <ReactQuill
      theme='snow'
      
    modules={modules}
      formats={formats}
      // value={value}
      // onChange={handleProcedureContentChange}
      
    /> 
  )
}

export default Editor;