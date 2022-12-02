import * as <<day>> from './';
import { TestCase } from '~/types';

describe('<<day>>', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(<<day>>.partOne(input)).toBe(expectedOutput);
    });
  });
});
