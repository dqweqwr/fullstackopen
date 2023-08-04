import { DiaryEntry } from "../types";
import { createEntry } from "../diaryEntryServices";
import { useEffect, useState } from "react";

const DiaryEntryForm = ({
  entries,
  setEntries,
}: {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<DiaryEntry[]>;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("great");
  const [weather, setWeather] = useState("sunny");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage !== "") {
      const timer = setTimeout(() => setErrorMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    createEntry(newEntry)
      .then((data) => {
        setEntries(entries.concat(data));
        setDate("");
        setComment("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  return (
    <>
      <h3>Add new entry</h3>
      <div style={{ color: "red" }}>{errorMessage}</div>
      <form onSubmit={diaryEntryCreation}>
        <div>
          <label htmlFor="date">date: </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility: great
          <input
            type="radio"
            name="visibility"
            value="great"
            onChange={({ target }) => setVisibility(target.value)}
            defaultChecked={true}
          />
          good
          <input
            type="radio"
            name="visibility"
            value="good"
            onChange={({ target }) => setVisibility(target.value)}
          />
          ok
          <input
            type="radio"
            name="visibility"
            value="ok"
            onChange={({ target }) => setVisibility(target.value)}
          />
          poor
          <input
            type="radio"
            name="visibility"
            value="poor"
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          weather: sunny
          <input
            type="radio"
            name="weather"
            value="sunny"
            onChange={({ target }) => setWeather(target.value)}
            defaultChecked={true}
          />
          rainy
          <input
            type="radio"
            name="weather"
            value="rainy"
            onChange={({ target }) => setWeather(target.value)}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            value="cloudy"
            onChange={({ target }) => setWeather(target.value)}
          />
          stormy
          <input
            type="radio"
            name="weather"
            value="stormy"
            onChange={({ target }) => setWeather(target.value)}
          />
          windy
          <input
            type="radio"
            name="weather"
            value="windy"
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">comment: </label>
          <input
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryEntryForm;
