import diagnosesController from "../controllers/diagnosesController";
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosesController.getDiagnoses());
});

export default router;
