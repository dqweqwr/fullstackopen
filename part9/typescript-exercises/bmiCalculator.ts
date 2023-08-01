import { isNotNumber } from "./utils";

type bmiValues = {
  heightCm: number;
  weightKg: number;
};

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("not enough arguments");
  if (args.length > 4) throw new Error("too many arguments");

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error("Input must be numbers");
  }

  return {
    heightCm: Number(args[2]),
    weightKg: Number(args[3]),
  };
};

const calculateBmi = (heightCm: number, weightKg: number): string => {
  if (heightCm === 0) {
    throw new Error("height cant be zero");
  }
  const heightMeters: number = heightCm / 100;
  const bmi: number = weightKg / heightMeters ** 2;
  if (bmi <= 18.4) {
    return "underweight";
  } else if (bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi <= 39.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

try {
  const { heightCm, weightKg } = parseArguments(process.argv);
  console.log(calculateBmi(heightCm, weightKg));
} catch (e) {
  console.log(e.message);
}
