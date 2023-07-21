import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBlogs } from "../reducers/blogsReducer"

import Blog from "./Blog"
import blogService from "../services/blogs"

const BlogList = () => {
  const dispatch = useDispatch()
  const [sortByLikes, setSortByLikes] = useState(true)

  let blogs = useSelector((state) => {
    return state.blogs
  })

  if (sortByLikes) {
    blogs = [...blogs].sort((a, b) => b.likes - a.likes)
  }

  useEffect(() => {
    const initializeBlogList = async () => {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }

    initializeBlogList()
  }, [])

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
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default BlogList
