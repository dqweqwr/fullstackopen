import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import { initializeUsers } from "../../reducers/usersReducer"

const User = () => {
  const dispatch = useDispatch()
  const match = useMatch("/users/:id")

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const user = useSelector((state) =>
    state.users.find((user) => user.id === match.params.id)
  )

  if (!user) {
    return <div>user not found</div>
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
