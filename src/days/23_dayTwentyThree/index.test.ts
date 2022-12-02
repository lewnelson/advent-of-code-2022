import * as dayTwentyThree from './';
import { TestCase } from '~/types';

describe('dayTwentyThree', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwentyThree.partOne(input)).toBe(expectedOutput);
    });
  });
});
