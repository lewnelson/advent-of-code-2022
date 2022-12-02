import * as daySeven from './';
import { TestCase } from '~/types';

describe('daySeven', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(daySeven.partOne(input)).toBe(expectedOutput);
    });
  });
});
