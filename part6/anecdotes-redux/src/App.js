import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

function App() {
  return (
    <>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdotesForm />
      <AnecdoteList />
    </>
  );
}

export default App;
