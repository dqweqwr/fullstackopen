import patients from "../../data/patients";
import { nonSensitivePatient, Patient } from "../../types";

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

export default {
  getAllPatients,
  getNonSensitivePatients,
};
