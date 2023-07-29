import LoginForm from "./LoginForm"

const Home = ({ setToken }) => {
  return (
    <>
      <h2>GraphQL Library app homepage</h2>
      <div>click authors for a list of authors</div>
      <div>click books for a list of books</div>
      {!localStorage.getItem("library-graphql-token") && (
        <LoginForm setToken={setToken} />
      )}
    </>
  )
}

export default Home
