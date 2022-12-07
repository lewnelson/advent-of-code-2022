// https://adventofcode.com/2022/day/6
import { Main } from '~/types';

const isUnique = (chars: string) => {
  const set = new Set(chars);
  return set.size === chars.length;
};

export const partOne: Main = input => {
  let i = 4;
  while (i < input.length) {
    const chars = input.slice(i - 4, i);
    if (isUnique(chars)) {
      return i;
    }

    i += 1;
  }

  return -1;
};
