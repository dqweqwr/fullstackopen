import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../../queries"
import AuthorsTable from "./AuthorsTable"

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) return <div>Loading...</div>

  return (
    <>
      <h2>Authors</h2>
      <AuthorsTable authors={result.data.allAuthors} />
    </>
  )
}

export default Authors
