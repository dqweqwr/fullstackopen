import { DiaryEntry } from "../types";
import { createEntry } from "../diaryEntryServices";

const DiaryEntryForm = ({
  entries,
  setEntries,
}: {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<DiaryEntry[]>;
}) => {
  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      date: { value: string };
      visibility: { value: string };
      weather: { value: string };
      comment: { value: string };
    };

    const newEntry = {
      date: target.date.value,
      visibility: target.visibility.value,
      weather: target.weather.value,
      comment: target.comment.value,
    };

    createEntry(newEntry)
      .then((data) => {
        setEntries(entries.concat(data));
        target.date.value = "";
        target.visibility.value = "";
        target.weather.value = "";
        target.comment.value = "";
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <h3>Add new entry</h3>
      <form onSubmit={diaryEntryCreation}>
        <div>
          <label htmlFor="date">date: </label>
          <input id="date" name="date" />
        </div>
        <div>
          <label htmlFor="visibility">visibility: </label>
          <input id="visibility" name="visibility" />
        </div>
        <div>
          <label htmlFor="weather">weather: </label>
          <input id="weather" name="weather" />
        </div>
        <div>
          <label htmlFor="comment">comment: </label>
          <input id="comment" name="comment" />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryEntryForm;
