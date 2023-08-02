import diaryService from "../services/diaryService";
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diary");
});

export default router;
