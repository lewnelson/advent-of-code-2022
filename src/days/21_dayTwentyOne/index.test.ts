import * as dayTwentyOne from './';
import { TestCase } from '~/types';

describe('dayTwentyOne', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwentyOne.partOne(input)).toBe(expectedOutput);
    });
  });
});
