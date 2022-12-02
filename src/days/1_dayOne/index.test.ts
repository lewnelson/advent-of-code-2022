import * as dayOne from './';
import { TestCase } from '~/types';

describe('dayOne', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayOne.partOne(input)).toBe(expectedOutput);
    });
  });
});
