import { ALL_BOOKS, FILTERED_BOOKS } from "../../queries"
import { useQuery } from "@apollo/client"

const BooksTable = ({ filter }) => {
  const result =
    filter === "all"
      ? useQuery(ALL_BOOKS)
      : useQuery(FILTERED_BOOKS, { variables: { genre: filter } })

  if (result.loading) return <div>Loading...</div>

  return (
    <table className="table">
      <tbody>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>genres</th>
          <th>published</th>
        </tr>
        {result.data.allBooks.map((book) => {
          return (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>
                {book.genres.length > 1
                  ? book.genres.join(", ")
                  : book.genres}
              </td>
              <td>{book.published}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default BooksTable
