import { calculateBmi } from "./bmiCalculator";
import express from "express";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello full stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) return res.json({ error: "malformed parameters" });
  const bmi: string = calculateBmi(height, weight);

  return res.json({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
