import { useEffect, useState } from "react";
import { getEntries } from "./diaryEntryServices";
import { DiaryEntry } from "./types";
import DiaryEntriesList from "./components/DiaryEntriesList";
import DiaryEntryForm from "./components/DiaryEntryForm";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getEntries().then((data) => setEntries(data));
  }, []);

  return (
    <>
      <DiaryEntryForm entries={entries} setEntries={setEntries} />
      <DiaryEntriesList entries={entries} />
    </>
  );
};

export default App;
