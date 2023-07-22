import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeUsers } from "../../reducers/usersReducer"
import { Link } from "react-router-dom"

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  return (
    <>
      <h1>Users</h1>
      <table className="users-table">
        <tbody>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Users
