import * as dayEleven from './';
import { TestCase } from '~/types';

describe('dayEleven', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayEleven.partOne(input)).toBe(expectedOutput);
    });
  });
});
