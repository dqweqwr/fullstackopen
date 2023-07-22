import { useEffect, useState } from "react"
import userServices from "../../services/users"

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userServices.getAll()
      .then(data =>
        setUsers(data)
      )
  }, [])

  console.log(users)

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
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.username}</td>
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

export default User
