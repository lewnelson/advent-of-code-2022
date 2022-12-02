import * as days from '~/days';
import { getDayString } from '~/lib/days';
import { execute } from '~/lib/execute';

const getDay = () => {
  return parseInt(process.argv[2], 10);
};

const main = () => {
  const day = getDay();
  const dayString = getDayString(day);
  const fn = days[dayString];
  execute(fn, day);
};

main();
