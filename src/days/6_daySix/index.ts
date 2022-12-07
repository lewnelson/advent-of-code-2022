// https://adventofcode.com/2022/day/6
import { Main } from '~/types';

const isUnique = (chars: string) => {
  const set = new Set(chars);
  return set.size === chars.length;
};

const getFirstNUniqueIndex = (input: string, n: number) => {
  if (input.length < n) return -1;
  let i = n;
  while (i < input.length) {
    const chars = input.slice(i - n, i);
    if (isUnique(chars)) {
      return i;
    }

    i += 1;
  }

  return -1;
};

export const partOne: Main = input => {
  return getFirstNUniqueIndex(input, 4);
};

export const partTwo: Main = input => {
  return getFirstNUniqueIndex(input, 14);
};
