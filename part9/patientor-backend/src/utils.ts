import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (isString(name)) {
    return name;
  }
  throw new Error("Incorrect name: " + name);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (isString(date) && isDate(date)) {
    return date;
  }
  throw new Error("Incorrect date: " + date);
};

const parseSsn = (ssn: unknown): string => {
  if (isString(ssn)) {
    return ssn;
  }
  throw new Error("Incorrect ssn: " + ssn);
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((genderType) => genderType.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (isString(gender) && isGender(gender)) {
    return gender;
  }
  throw new Error("Incorrect gender: " + gender);
};

const parseOccupation = (occupation: unknown): string => {
  if (isString(occupation)) {
    return occupation;
  }
  throw new Error("Incorrect occupation: " + occupation);
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  }

  throw new Error("Incorrect data. Some fields are missing");
};
