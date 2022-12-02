import * as dayFourteen from './';
import { TestCase } from '~/types';

describe('dayFourteen', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFourteen.partOne(input)).toBe(expectedOutput);
    });
  });
});
