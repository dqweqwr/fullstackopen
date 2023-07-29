import { useQuery } from "@apollo/client"
import { FAVORITE_GENRE } from "../../queries"
import BooksTable from "./BooksTable"

const Recommendations = () => {
  if (!localStorage.getItem("library-graphql-token")) {
    return (
      <>
        <h2>Recommendations</h2>
        <div>You must be logged in to view book recommendations</div>
      </>
    )
  }

  const result = useQuery(FAVORITE_GENRE)

  if (result.loading) return null

  const favoriteGenre = result.data.me.favoriteGenre

  return (
    <>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre: <strong>{favoriteGenre}</strong>
      </div>
      <BooksTable filter={favoriteGenre} />
    </>
  )
}

export default Recommendations
