// https://adventofcode.com/2022/day/4
import { Main } from '~/types';

type OverlapFn = (a: string, b: string) => boolean;

const getStartAndEnd = (assignment: string): [number, number] => {
  return assignment.split('-').map(Number) as [number, number];
};

const doesAssignmentFullyOverlap: OverlapFn = (a, b) => {
  const [aStart, aEnd] = getStartAndEnd(a);
  const [bStart, bEnd] = getStartAndEnd(b);
  if (aStart <= bStart && aEnd >= bEnd) return true;
  if (bStart <= aStart && bEnd >= aEnd) return true;
  return false;
};

const doesAssignmentOverlap: OverlapFn = (a, b) => {
  const [aStart, aEnd] = getStartAndEnd(a);
  const [bStart, bEnd] = getStartAndEnd(b);
  if (aStart >= bStart && aStart <= bEnd) return true;
  if (aEnd >= bStart && aEnd <= bEnd) return true;
  if (bStart >= aStart && bStart <= aEnd) return true;
  if (bEnd >= aStart && bEnd <= aEnd) return true;
  return false;
};

const getPairsThatOverlap = (input: string, overlapFn: OverlapFn): number => {
  const pairs = input.split('\n');
  const overlappingPairs = pairs.reduce((n, pair) => {
    if (!pair) return n;
    const [assignmentA, assignmentB] = pair.split(',');
    return overlapFn(assignmentA, assignmentB) ? n + 1 : n;
  }, 0);

  return overlappingPairs;
};

export const partOne: Main = input => {
  return getPairsThatOverlap(input, doesAssignmentFullyOverlap);
};

export const partTwo: Main = input => {
  return getPairsThatOverlap(input, doesAssignmentOverlap);
};
