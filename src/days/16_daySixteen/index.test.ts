import * as daySixteen from './';
import { TestCase } from '~/types';

describe('daySixteen', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(daySixteen.partOne(input)).toBe(expectedOutput);
    });
  });
});
