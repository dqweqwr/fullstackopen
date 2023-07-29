import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../../queries"
import BooksTable from "./BooksTable"
import BookForm from "./BookForm"

const Books = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) return <div>Loading...</div>

  return (
    <>
      <h2>Books</h2>
      {localStorage.getItem("library-graphql-token") ? (
        <BookForm />
      ) : (
        <div>Login to add books</div>
      )}
      <BooksTable books={result.data.allBooks} />
    </>
  )
}

export default Books
