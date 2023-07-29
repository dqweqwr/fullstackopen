import { useQuery } from "@apollo/client"
import { ALL_GENRES } from "../../queries"

const BooksFilter = ({ setFilter }) => {
  const result = useQuery(ALL_GENRES)

  if (result.loading) return null

  return (
    <>
      <div>Filter by genre:</div>
      <div>
        current genre filter:{" "}
        <select onChange={({ target }) => setFilter(target.value)}>
          <option value={"all"}>All</option>
          {result.data.allGenres.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}

export default BooksFilter
