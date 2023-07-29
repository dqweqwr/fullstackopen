import BooksTable from "./BooksTable"
import BookForm from "./BookForm"
import BooksFilter from "./BooksFilter"
import { useState } from "react"

const Books = () => {
  const [filter, setFilter] = useState("all")

  return (
    <>
      <h2>Books</h2>
      <BooksFilter setFilter={setFilter} />
      {localStorage.getItem("library-graphql-token") ? (
        <>
          <BookForm />
        </>
      ) : (
        <div>Login to add books</div>
      )}
      <BooksTable filter={filter} />
    </>
  )
}

export default Books
