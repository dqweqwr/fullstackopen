import patientsController from "../controllers/patientsController";
import express from "express";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsController.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsController.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    let errorMessage = "Something wrong occured";
    if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
