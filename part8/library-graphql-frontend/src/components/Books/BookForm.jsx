import { useMutation } from "@apollo/client"
import { useId, useState } from "react"
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../../queries"

const BookForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])
  const [showForm, setShowForm] = useState(false)

  const titleId = useId()
  const authorId = useId()
  const publishedId = useId()
  const genreId = useId()

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre("")
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published, genres } })

    setTitle("")
    setAuthor("")
    setPublished("")
    setGenre("")
    setGenres([])
  }

  if (!showForm) {
    return (
      <button onClick={() => setShowForm(!showForm)}>
        Add new book
      </button>
    )
  }

  return (
    <>
      <button onClick={() => setShowForm(!showForm)}>Cancel</button>
      <form onSubmit={handleSubmit}>
        <h3>Add book</h3>
        <div>
          <label htmlFor={titleId}>Title: </label>
          <input
            id={titleId}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor={authorId}>Author: </label>
          <input
            id={authorId}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor={publishedId}>Published: </label>
          <input
            id={publishedId}
            type="number"
            value={published}
            onChange={({ target }) =>
              setPublished(Number(target.value))
            }
          />
        </div>
        <div>
          <label htmlFor={genreId}>Add a genre: </label>
          <input
            id={genreId}
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button type="button" onClick={addGenre}>
            Add genre
          </button>
          <div>
            Genres: {genres.length > 1 ? genres.join(", ") : genres}
          </div>
          <button type="button" onClick={() => setGenres([])}>
            Clear genres
          </button>
        </div>
        <button type="submit">Add book</button>
      </form>
    </>
  )
}

export default BookForm
