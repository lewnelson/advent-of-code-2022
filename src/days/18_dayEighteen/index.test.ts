import * as dayEighteen from './';
import { TestCase } from '~/types';

describe('dayEighteen', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayEighteen.partOne(input)).toBe(expectedOutput);
    });
  });
});
