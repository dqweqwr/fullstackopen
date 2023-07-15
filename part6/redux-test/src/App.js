import { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";

const App = () => {
  return (
    <>
      <NewNote />
      <Notes />
    </>
  );
}

export default App;
