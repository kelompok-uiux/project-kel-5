import { useState } from "react";
import NoteCard from './NoteCard'

const NoteCardList = () => {
  // State untuk menyimpan daftar note cards
  const [cards, setCards] = useState([NoteCard] as typeof NoteCard[]);

  // Fungsi untuk menambahkan note card baru
  const addNewNoteCard = (noteCardComponent: any) => {
    // Tambahkan note card baru ke daftar
    setCards(prevCards => [...prevCards, noteCardComponent]);
  };

  return (
    <div>
      {/* Render setiap NoteCard */}
      {cards.map((CardComponent, index) => (
        <CardComponent key={index} newNote={addNewNoteCard} />
      ))}
      <button onClick={() => addNewNoteCard(NoteCard)}>Tambah NoteCard</button>
    </div>
  );
};

export default NoteCardList;