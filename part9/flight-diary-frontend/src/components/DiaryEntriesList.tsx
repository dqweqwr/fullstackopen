import { DiaryEntry } from "../types";

const DiaryEntriesList = ({ entries }: { entries: DiaryEntry[] }) => {
  console.log(entries);
  if (entries.length === 0) return;

  return (
    <>
      <h3>Diary entries</h3>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <div>{entry.visibility}</div>
          <div>{entry.weather}</div>
        </div>
      ))}
    </>
  );
};

export default DiaryEntriesList;
