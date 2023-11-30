import { renderWithProviders } from "@/utils/test-utils"
import NoteCardModal from "../app/components/NoteCardModal"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Note } from "@/features/note/noteSlice"

const noteCardModalProps = {
  modalIsOpen: {
    noteId: "1",
    show: true,
  },

  onClose: () => {
    return
  },
}

type ImageData = {
  name: string
  image: string
}


describe("NoteCardModal Component", () => {
  it("title note should be  changed", async () => {
    const initialNotes = [
      {
        id: "1",
        title: "Judul test",
        content: "Test Content",
        pinned: true,
        lastEdited: "11-06-2023",
        modalIsOpen: true,
        noteImage:
          "https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
        optionColor: "#faafa8",
      },
    ]
    await act(async () =>
      renderWithProviders(
        <NoteCardModal
          modalIsOpen={noteCardModalProps.modalIsOpen}
          onClose={noteCardModalProps.onClose}
        />,
        {
          preloadedState: {
            note: { notes: initialNotes as Note[], filterString: "" },
          },
        }
      )
    )

    const titleDiv = screen.getByRole("title-div")
    fireEvent.click(titleDiv)

    const titleEl: any = screen.getByRole("title-input")
    const testValue = "test"

    fireEvent.change(titleEl, { target: { value: testValue } })

    expect(titleEl.value).toBe("test")
  })

  it("pin  note should be  true", async () => {
    const initialNotes = [
      {
        id: "1",
        title: "Judul test",
        content: "Test Content",
        pinned: false,
        lastEdited: "11-06-2023",
        modalIsOpen: true,
        noteImage:
          "https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
        optionColor: "#faafa8",
      },
    ]
    let container :any;
    await act(async () => {
      container=    renderWithProviders(
        <NoteCardModal
          modalIsOpen={noteCardModalProps.modalIsOpen}
          onClose={noteCardModalProps.onClose}
        />,
        {
          preloadedState: {
            note: { notes: initialNotes as Note[], filterString: "" },
          },
        }
      )
    })

    const pinTrueEl=  screen.getByRole('pin-true')

    fireEvent.click(pinTrueEl)

    const pinFalseEl=  screen.getByRole('pin-false')

    expect(pinFalseEl.classList.contains('hidden')).toBe(false);

  })

  it("pin  note should be  false", async () => {
    const initialNotes = [
      {
        id: "1",
        title: "Judul test",
        content: "Test Content",
        pinned: true,
        lastEdited: "11-06-2023",
        modalIsOpen: true,
        noteImage:
          "https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
        optionColor: "#faafa8",
      },
    ]
    let container :any;
    await act(async () => {
      container=    renderWithProviders(
        <NoteCardModal
          modalIsOpen={noteCardModalProps.modalIsOpen}
          onClose={noteCardModalProps.onClose}
        />,
        {
          preloadedState: {
            note: { notes: initialNotes as Note[], filterString: "" },
          },
        }
      )
    })

    const pinFalseEl=  screen.getByRole('pin-false')

    fireEvent.click(pinFalseEl)

    const pinTrueEl=  screen.getByRole('pin-true')

    expect(pinTrueEl.classList.contains('hidden')).toBe(false);

  })

  // it("note  background color should be  changed", async () => {
  //   const initialNotes = [
  //     {
  //       id: "1",
  //       title: "Judul test",
  //       content: "Test Content",
  //       pinned: true,
  //       lastEdited: "11-06-2023",
  //       modalIsOpen: true,
  //       noteImage:
  //         "https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
  //       optionColor: "#faafa8",
  //     },
  //   ]
  //   let container :any;

  //   const images: ImageData[] = [
  //     {
  //       name: "default",
  //       image: "bg-white",
  //     },
  //     {
  //       name: "recipes",
  //       image:
  //         "https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg",
  //     },
  //     {
  //       name: "places",
  //       image:
  //         "https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg",
  //     },
  //     {
  //       name: "groceries",
  //       image:
  //         "https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg",
  //     },
  //     {
  //       name: "food",
  //       image: "https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg",
  //     },
  //     {
  //       name: "music",
  //       image:
  //         "https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg",
  //     },
  //     {
  //       name: "notes",
  //       image:
  //         "https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg",
  //     },
  //     {
  //       name: "travel",
  //       image:
  //         "https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
  //     },
  //     {
  //       name: "video",
  //       image:
  //         "https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg",
  //     },
  //     {
  //       name: "celebration",
  //       image:
  //         "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
  //     },
  //   ]

  //   await act(async () => {
  //     container=    renderWithProviders(
  //       <NoteCardModal
  //         modalIsOpen={noteCardModalProps.modalIsOpen}
  //         onClose={noteCardModalProps.onClose}
  //       />,
  //       {
  //         preloadedState: {
  //           note: { notes: initialNotes as Note[], filterString: "" },
  //         },
  //       }
  //     )
  //   })

  //   const noteImageEl = screen.getByRole('note-image');

  //   const changeBackgroundel = screen.getByRole('change-background');




  // })



})
