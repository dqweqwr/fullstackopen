import { useState } from "react"

const Blog = ({ blog }) => {
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
      {showDetails &&
        <>
          <div>url: {blog.url}</div>
          <div>
            likes: {blog.likes}
            {" "}
            <button>like</button>
          </div>
          <div>Posted by: {blog.user.username}</div>
        </>
      }
    </div>
  )
}

export default Blog
