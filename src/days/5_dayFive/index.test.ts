import * as dayFive from './';
import { TestCase } from '~/types';

describe('dayFive', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFive.partOne(input)).toBe(expectedOutput);
    });
  });
});
