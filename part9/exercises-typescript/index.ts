import { calculateBmi } from "./bmiCalculator";
import express from "express";
import { calculateExercises, Result } from "./exerciseCalculator";
import { isNotNumber } from "./utils";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target)
    return res.json({ error: "parameters missing" });

  if (isNotNumber(target) || !Array.isArray(daily_exercises)) {
    return res.json({ error: "malformatted parameters" });
  }

  if (daily_exercises.some((day) => isNotNumber(day))) {
    return res.json({ error: "malformatted parameters" });
  }

  const result: Result = calculateExercises(
    target as number,
    daily_exercises as number[],
  );

  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
