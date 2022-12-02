// https://adventofcode.com/2022/day/1
import { Main } from '~/types';

export const partOne: Main = input => {
  const elves = input.split('\n\n').map(elf => elf.split('\n').reduce((acc, curr) => acc + parseInt(curr), 0));
  elves.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
  return isNaN(elves[elves.length - 1]) ? 0 : elves[elves.length - 1];
};
