export interface DiaryEntry {
  date: string;
  id: number;
  visibility: string;
  weather: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
