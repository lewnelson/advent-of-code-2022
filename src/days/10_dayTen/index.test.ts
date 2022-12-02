import * as dayTen from './';
import { TestCase } from '~/types';

describe('dayTen', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTen.partOne(input)).toBe(expectedOutput);
    });
  });
});
