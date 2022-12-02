import * as dayTwentyFive from './';
import { TestCase } from '~/types';

describe('dayTwentyFive', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwentyFive.partOne(input)).toBe(expectedOutput);
    });
  });
});
