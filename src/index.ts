import cliSelect from 'cli-select';
import prompt from 'prompt';
import * as days from '~/days';
import { getDayString } from '~/lib/days';
import { execute } from '~/lib/execute';

const promptForDay = async () => {
  console.log('Which day would you like to run?');
  const dayMap = {
    'Day one': 1,
    'Day two': 2,
    'Day three': 3,
    'Day four': 4,
    'Day five': 5,
    'Day six': 6,
    'Day seven': 7,
    'Day eight': 8,
    'Day nine': 9,
    'Day ten': 10,
    'Day eleven': 11,
    'Day twelve': 12,
    'Day thirteen': 13,
    'Day fourteen': 14,
    'Day fifteen': 15,
    'Day sixteen': 16,
    'Day seventeen': 17,
    'Day eighteen': 18,
    'Day nineteen': 19,
    'Day twenty': 20,
    'Day twenty-one': 21,
    'Day twenty-two': 22,
    'Day twenty-three': 23,
    'Day twenty-four': 24,
    'Day twenty-five': 25,
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  let values = Object.keys(dayMap);
  let defaultValue = undefined;
  if (year === 2022 && month === 11 && day <= 25) {
    defaultValue = day - 1;
    values = Object.keys(dayMap).slice(0, day);
  }

  const choice = await cliSelect({
    values,
    defaultValue,
  });

  return dayMap[choice.value as keyof typeof dayMap];
};

const BACK = '<back>';

const promptForFunction = async <T extends {}>(functions: T) => {
  console.log('Which function would you like to run?');
  const keys = Object.keys(functions);
  const choice = await cliSelect<keyof T>({
    values: [...keys, BACK] as (keyof T)[],
  });

  return choice.value;
};

const main = async (): Promise<void> => {
  console.clear();
  const day = await promptForDay();
  if (day < 0) {
    console.clear();
    process.exit(0);
  }

  const dayString = getDayString(day);
  const dayFunctions = days[dayString];
  console.clear();
  const functionName = await promptForFunction(dayFunctions);
  if (functionName as string === BACK) {
    return main();
  }

  try {
    const output = execute(dayFunctions[functionName], day);
    console.log(`Output: ${output}`);
    console.log('\nRun another day? Y/n');

    prompt.start();

    try {
      const result = await prompt.get([
        { name: 'continue', description: 'Run another day? Y/n' },
      ]);

      const runAnotherDay = result.continue.toString().toLowerCase() || 'y';
      if (runAnotherDay[0] !== 'y') {
        process.exit(0);
      }
    } catch (error) {
      process.exit(0);
    }
  } catch (error) {
    console.error(error);
  }

  return main();
};

main().catch(err => {});
