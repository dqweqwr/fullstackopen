import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";

function App() {
  return (
    <>
      <h1>Anecdotes</h1>
      <Filter />
      <AnecdotesForm />
      <AnecdoteList />
    </>
  );
}

export default App;
