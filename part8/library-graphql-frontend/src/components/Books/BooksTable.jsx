const BooksTable = ({ books }) => {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((book) => {
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
  )
}

export default BooksTable
