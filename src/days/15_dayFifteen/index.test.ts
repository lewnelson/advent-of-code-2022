import * as dayFifteen from './';
import { TestCase } from '~/types';

describe('dayFifteen', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFifteen.partOne(input)).toBe(expectedOutput);
    });
  });
});
