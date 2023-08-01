import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  exerciseHours: number[];
  target: number;
}

const parseArguments = (args: string[]): exerciseValues => {
  if (args.length < 2) throw new Error("not enough input");

  const [targetStr, ...exerciseHoursStr]: string[] = args;

  if (isNotNumber(targetStr)) throw new Error("input must be numbers");
  exerciseHoursStr.map((hourStr) => {
    if (isNotNumber(hourStr)) throw new Error("input must be numbers");
  });

  const exerciseHours: number[] = exerciseHoursStr.map((hour) => Number(hour));
  const target: number = Number(targetStr);

  return {
    exerciseHours,
    target,
  };
};

// all time in hours
const calculateExercises = (
  target: number,
  exerciseHours: number[],
): Result => {
  if (target === 0) throw new Error("Target cannot be 0");

  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter((day) => day !== 0).length;

  const timeExercisedTotal: number = exerciseHours.reduce(
    (hoursTotal, day) => (hoursTotal += day),
    0,
  );

  const average: number = timeExercisedTotal / periodLength;
  const success: boolean = average >= target;

  let rating: number;
  let ratingDescription: string;
  if (success) {
    rating = 3;
    ratingDescription = "Excellent work";
  } else if (average / target > 0.9) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "Needs some work";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const args: string[] = process.argv.slice(2);
try {
  const { target, exerciseHours } = parseArguments(args);
  console.log(calculateExercises(target, exerciseHours));
} catch (e) {
  console.log(e.message);
}
