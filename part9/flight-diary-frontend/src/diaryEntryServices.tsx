import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getEntries = () =>
  axios.get<DiaryEntry[]>(baseUrl).then((res) => res.data);

export const createEntry = (object: NewDiaryEntry) =>
  axios.post<DiaryEntry>(baseUrl, object).then((res) => res.data);
