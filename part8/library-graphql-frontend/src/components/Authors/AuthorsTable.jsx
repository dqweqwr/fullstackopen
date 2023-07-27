const AuthorsTable = ({ authors }) => {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th>name</th>
          <th>born</th>
          <th>books</th>
        </tr>
        {authors.map((author) => {
          return (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born ? author.born : "null"}</td>
              <td>{author.bookCount}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default AuthorsTable
