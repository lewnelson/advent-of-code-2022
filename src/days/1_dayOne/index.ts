// https://adventofcode.com/2022/day/1
import { Main } from '~/types';

const getElvesTotalCaloriesSorted = (input: string): number[] => {
  const caloriesPerElf = input.split('\n\n').map(elf => elf.split('\n').reduce((acc, curr) => {
    const n = parseInt(curr, 10);
    if (isNaN(n)) return acc;
    return acc + n;
  }, 0));

  caloriesPerElf.sort((a, b) => a > b ? -1 : a < b ? 1 : 0);
  return caloriesPerElf;
};

const sum = (acc: number, curr: number) => acc + curr;

export const partOne: Main = input => {
  const caloriesPerElf = getElvesTotalCaloriesSorted(input);
  return caloriesPerElf.slice(0, 1).reduce(sum, 0);
};

export const partTwo: Main = input => {
  const caloriesPerElf = getElvesTotalCaloriesSorted(input);
  return caloriesPerElf.slice(0, 3).reduce(sum, 0);
};
