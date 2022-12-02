import * as dayTwenty from './';
import { TestCase } from '~/types';

describe('dayTwenty', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwenty.partOne(input)).toBe(expectedOutput);
    });
  });
});
