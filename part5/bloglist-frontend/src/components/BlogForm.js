const BlogForm = (props) => {
  const {
    title,
    handleTitleChange,
    url,
    handleUrlChange,
    author,
    handleAuthorChange,
    addBlog
  } = props

  return (
    <>
      <h1>Create new blog listing</h1>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <button onClick={addBlog}>Create</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm
