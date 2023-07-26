import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) return <div>Loading...</div>

  return (
    <>
      <h2>Authors</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((author) => {
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
    </>
  )
}

export default Authors
