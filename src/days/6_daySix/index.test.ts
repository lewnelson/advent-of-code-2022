import * as daySix from './';
import { TestCase } from '~/types';

describe('daySix', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(daySix.partOne(input)).toBe(expectedOutput);
    });
  });
});
