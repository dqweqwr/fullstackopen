import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) return <div>Loading...</div>

  return (
    <>
      <h2>Books</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Books
