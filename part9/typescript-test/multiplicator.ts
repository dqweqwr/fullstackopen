interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("too many arguments");

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Provided values were not numbers!");
  } else {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  }
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result is:`,
  );
} catch (e: unknown) {
  let errorMessage = "Error occured: ";
  if (e instanceof Error) {
    errorMessage += e.message;
  }
  console.log(errorMessage);
}
