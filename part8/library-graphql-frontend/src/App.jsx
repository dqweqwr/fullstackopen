import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Authors from "./components/Authors/Authors"
import Books from "./components/Books/Books"
import { useApolloClient } from "@apollo/client"

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.removeItem("library-graphql-token")
    client.resetStore()
  }

  return (
    <>
      <Navbar logout={logout} />
      <Routes>
        <Route path="/" element={<Home setToken={setToken} />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </>
  )
}

export default App
