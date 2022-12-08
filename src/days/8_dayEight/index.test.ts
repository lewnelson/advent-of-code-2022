import * as dayEight from './';
import { TestCase } from '~/types';

const inputA = `30373
25512
65332
33549
35390`;

describe('dayEight', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'for the given grid of trees a total of 21 trees are visible', input: inputA, expectedOutput: 21 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayEight.partOne(input)).toBe(expectedOutput);
    });
  });
});
