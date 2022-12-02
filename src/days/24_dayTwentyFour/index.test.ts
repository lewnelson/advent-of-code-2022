import * as dayTwentyFour from './';
import { TestCase } from '~/types';

describe('dayTwentyFour', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwentyFour.partOne(input)).toBe(expectedOutput);
    });
  });
});
