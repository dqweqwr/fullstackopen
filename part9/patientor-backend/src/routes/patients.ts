import patientsController from "../controllers/patientsController";
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsController.getNonSensitivePatients());
});

export default router;
