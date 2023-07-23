import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
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
    <div className="mt-6">
      <div className="flex flex-row justify-between items-center ">
        <h1 className="font-bold text-3xl mb-4">Blogs</h1>
        <div className="font-bold text-sm">
          sort by:
          {" "}
          <button
            onClick={() => setSortByLikes(!sortByLikes)}
            className="button px-2 py-1 rounded-lg font-semibold bg-cyan-50 text-black hover:text-white border-cyan-50"
          >
            {sortByLikes ? "most liked" : "oldest"}
          </button>{" "}
        </div>
      </div>
      <div>
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="mb-1 px-5 py-2 bg-gray-50 border rounded-lg blog-item-shadow hover:bg-cyan-100 duration-300"
          >
            <Link
              className="link font-bold"
              to={`/blogs/${blog.id}`}
            >
              {blog.title}
            </Link>
            <div
              className="font-thin text-xxs text-gray-600"
            >
              <div>
                Likes: {blog.likes}
                {" "}|{" "}
                Posted: {dayjs(blog.createdAt).fromNow()} by {blog.user.username}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
