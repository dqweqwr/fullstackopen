import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../../queries"
import AuthorsTable from "./AuthorsTable"
import SetBirthyearForm from "./SetBirthyearForm"

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) return <div>Loading...</div>

  return (
    <>
      <h2>Authors</h2>
      <SetBirthyearForm authors={result.data.allAuthors} />
      <AuthorsTable authors={result.data.allAuthors} />
    </>
  )
}

export default Authors
