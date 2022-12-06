// https://adventofcode.com/2022/day/4
import { Main } from '~/types';

const doesAssignmentOverlap = (a: string, b: string): boolean => {
  const [aStart, aEnd] = a.split('-').map(Number);
  const [bStart, bEnd] = b.split('-').map(Number);
  if (aStart <= bStart && aEnd >= bEnd) return true;
  if (bStart <= aStart && bEnd >= aEnd) return true;
  return false;
};

export const partOne: Main = input => {
  const pairs = input.split('\n');
  const pairsWithFullOverlaps = pairs.reduce((n, pair) => {
    if (!pair) return n;
    const [assignmentA, assignmentB] = pair.split(',');
    return doesAssignmentOverlap(assignmentA, assignmentB) ? n + 1 : n;
  }, 0);

  return pairsWithFullOverlaps;
};
