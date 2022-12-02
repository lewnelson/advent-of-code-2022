import path from 'path';
import execa from 'execa';
import { getDayString } from '~/lib/days';

const getDays = () => {
  const [_, __, ...days] = process.argv;
  if (!days.length) return new Array(25).fill(null).map((_, i) => i + 1);
  return days.map((day) => parseInt(day));
};

const main = async () => {
  const days = getDays();
  const testPaths = days.map(day => {
    const dayString = getDayString(day);
    return path.join('src', 'days', `${day}_${dayString}`, 'index.test.ts');
  });

  try {
    await execa('jest', ['--', ...testPaths], {
      stdio: 'inherit',
    });
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

main();
