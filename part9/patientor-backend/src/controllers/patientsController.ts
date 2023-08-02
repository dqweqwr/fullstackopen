import patients from "../../data/patients";
import { NewPatient, nonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getAllPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): nonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    ...patient,
    id,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  getNonSensitivePatients,
  addPatient,
};
