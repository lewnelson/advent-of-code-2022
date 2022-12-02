import * as daySeventeen from './';
import { TestCase } from '~/types';

describe('daySeventeen', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(daySeventeen.partOne(input)).toBe(expectedOutput);
    });
  });
});
