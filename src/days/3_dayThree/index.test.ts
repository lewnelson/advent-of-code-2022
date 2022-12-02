import * as dayThree from './';
import { TestCase } from '~/types';

describe('dayThree', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayThree.partOne(input)).toBe(expectedOutput);
    });
  });
});
