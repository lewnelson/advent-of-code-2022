import * as dayFour from './';
import { TestCase } from '~/types';

const inputA = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const inputB = '';

describe('dayFour', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'when there are two pairs where the elves section assignments fully overlap', input: inputA, expectedOutput: 2 },
      { description: 'when there is no input it returns 0', input: inputB, expectedOutput: 0 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFour.partOne(input)).toBe(expectedOutput);
    });
  });
});
