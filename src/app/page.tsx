"use client"
import Image from 'next/image'
import NoteCard from './components/NoteCard'
import Editor from './components/TesEditor'
import NoteCardModal from './components/NoteCardModal'
import React, { ReactNode, useState } from 'react'
import NoteCardList from './components/NoteCardList'



export default function Home() {


 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <NoteCardModal/>

        <NoteCardList/>

        <Editor/>
    
    </main>
  )
}
