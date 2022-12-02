import * as dayNine from './';
import { TestCase } from '~/types';

describe('dayNine', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayNine.partOne(input)).toBe(expectedOutput);
    });
  });
});
