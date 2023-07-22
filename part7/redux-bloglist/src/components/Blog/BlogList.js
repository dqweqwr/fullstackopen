import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const BlogList = () => {
  const [sortByLikes, setSortByLikes] = useState(true)

  let blogs = useSelector((state) => {
    return state.blogs
  })

  if (sortByLikes) {
    blogs = [...blogs].sort((a, b) => b.likes - a.likes)
  }

  return (
    <>
      <div>
        Sort by:{" "}
        <button onClick={() => setSortByLikes(!sortByLikes)}>
          {sortByLikes ? "most liked" : "oldest"}
        </button>{" "}
        on top
      </div>
      <div className="list-of-blogs">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-listing">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default BlogList
