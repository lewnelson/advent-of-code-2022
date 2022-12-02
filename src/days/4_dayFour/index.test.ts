import * as dayFour from './';
import { TestCase } from '~/types';

describe('dayFour', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFour.partOne(input)).toBe(expectedOutput);
    });
  });
});
