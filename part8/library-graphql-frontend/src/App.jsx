import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Authors from "./components/Authors/Authors"
import Books from "./components/Books/Books"
import Recommendations from "./components/Books/Recommendations"
import { useApolloClient, useSubscription } from "@apollo/client"
import { ALL_BOOKS, BOOK_ADDED } from "./queries.js"

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert("new book added")
      console.log(data)

      client.cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        return {
          allBooks: data.allBooks.concat(addedBook),
        }
      })
    },
  })

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
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </>
  )
}

export default App
