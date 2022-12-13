// https://adventofcode.com/2022/day/13
import { Main } from '~/types';

type Order = 'left' | 'right' | 'equal';

const isNumber = (value: unknown): value is number => typeof value === 'number';

const getNumberOrder = (left: number, right: number): Order => {
  if (left < right) return 'left';
  if (left > right) return 'right';
  return 'equal';
};

const getOrder = (left: unknown, right: unknown): Order => {
  if (left === undefined && right === undefined) return 'equal';
  if (left === undefined && right !== undefined) return 'left';
  if (left !== undefined && right === undefined) return 'right';
  if (isNumber(left) && isNumber(right)) return getNumberOrder(left, right);
  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLength = Math.max(left.length, right.length);
    for (let i = 0; i < maxLength; i++) {
      const leftValue = left[i];
      const rightValue = right[i];
      const order = getOrder(leftValue, rightValue);
      if (order !== 'equal') return order;
    }

    return 'equal';
  }

  if (Array.isArray(left) && !Array.isArray(right)) return getOrder(left, [right]);
  if (!Array.isArray(left) && Array.isArray(right)) return getOrder([left], right);
  throw new Error('Unhandled');
};

export const partOne: Main = input => {
  const pairs = input.split('\n\n');
  const sum = pairs.reduce((total, pair, index) => {
    const pairNumber = index + 1;
    const [left, right] = pair.split('\n').map(line => JSON.parse(line));
    const order = getOrder(left, right);
    return order === 'left' ? total + pairNumber : total;
  }, 0);

  return sum;
};
