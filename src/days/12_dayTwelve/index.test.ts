import * as dayTwelve from './';
import { TestCase } from '~/types';

const inputA = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe('dayTwelve', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'for the given map it takes 31 steps to reach E from S', input: inputA, expectedOutput: 31 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwelve.partOne(input)).toBe(expectedOutput);
    });
  });
});
