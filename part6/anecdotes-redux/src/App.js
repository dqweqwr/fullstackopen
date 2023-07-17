import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteServices from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdotesReducer";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteServices.getAll()
      .then(anecdotes => {
        dispatch(setAnecdotes(anecdotes))
      })
  }, [dispatch])

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
