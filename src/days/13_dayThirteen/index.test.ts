import * as dayThirteen from './';
import { TestCase } from '~/types';

describe('dayThirteen', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayThirteen.partOne(input)).toBe(expectedOutput);
    });
  });
});
