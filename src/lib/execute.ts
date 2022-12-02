import path from 'path';
import { Main } from '~/types';
import { getDayString } from '~/lib/days';
import { loadInput } from '~/lib/loadInput';
import { paths } from '~/constants';

export const execute = (fn: Main, day: number) => {
  const dayString = getDayString(day);
  const dayDirectory = path.join(paths.days, `${day}_${dayString}`);
  const input = loadInput(dayDirectory);
  const result = fn(input);
  console.log(result);
};
