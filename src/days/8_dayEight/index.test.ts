import * as dayEight from './';
import { TestCase } from '~/types';

describe('dayEight', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayEight.partOne(input)).toBe(expectedOutput);
    });
  });
});
