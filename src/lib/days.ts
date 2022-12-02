import { dayMap } from '~/constants';

export const getDayString = (day: number) => {
  if (day < 1 || day > 25) {
    throw new Error('Invalid day');
  }

  return dayMap[day as keyof typeof dayMap];
};
