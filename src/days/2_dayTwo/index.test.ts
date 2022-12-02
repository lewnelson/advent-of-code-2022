import * as dayTwo from './';
import { TestCase } from '~/types';

describe('dayTwo', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwo.partOne(input)).toBe(expectedOutput);
    });
  });
});
