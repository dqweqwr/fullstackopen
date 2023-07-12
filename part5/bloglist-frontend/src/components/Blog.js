import { useState } from "react"

const Blog = ({ blog, updateLikes }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="blog-listing">
      <div>
        title: {blog.title}
        {" "}
        author: {blog.author}
        {" "}
        <button onClick={toggleShowDetails}>{showDetails ? "hide" : "view"}</button>
      </div>  
      {true &&
        <>
          <div>url: {blog.url}</div>
          <div>
            likes: {blog.likes}
            {" "}
            <button onClick={() => updateLikes(blog.id)}>
              like
            </button>
          </div>
          <div>Posted by: {blog.user.username}</div>
        </>
      }
    </div>
  )
}

export default Blog
