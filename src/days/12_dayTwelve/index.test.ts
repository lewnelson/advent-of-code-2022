import * as dayTwelve from './';
import { TestCase } from '~/types';

describe('dayTwelve', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwelve.partOne(input)).toBe(expectedOutput);
    });
  });
});
