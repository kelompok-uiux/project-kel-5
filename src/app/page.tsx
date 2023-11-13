import TestComponent from "./components/TestComponent"
import Header from "./components/Header"

export default function Home() {
  //  ${showModal} ? "bg-opacity-25": ""
  return (
    <div>
      <Header />
      <TestComponent />
    </div>
  )
}
