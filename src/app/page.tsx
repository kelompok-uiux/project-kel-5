import TestComponent from "./components/TestComponent"
import Header from "./components/Header"

export default function Home() {
  return (
    <div className="text-red-500">
      <Header />
      <TestComponent />
    </div>
  )
}
