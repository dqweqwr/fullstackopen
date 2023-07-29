import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Authors from "./components/Authors/Authors"
import Books from "./components/Books/Books"
import Recommendations from "./components/Books/Recommendations"
import { useApolloClient } from "@apollo/client"

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem("library-graphql-token"))
  }, [])

  const logout = async () => {
    localStorage.removeItem("library-graphql-token")
    await client.resetStore()
    setToken(null)
  }

  return (
    <>
      <Navbar logout={logout} />
      <Routes>
        <Route path="/" element={<Home setToken={setToken} />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/recommendations"
          element={<Recommendations />}
        />
      </Routes>
    </>
  )
}

export default App
