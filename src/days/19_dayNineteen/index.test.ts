import * as dayNineteen from './';
import { TestCase } from '~/types';

describe('dayNineteen', () => {
  const testCases: TestCase[] = [
    { description: 'not implemented', input: '', expectedOutput: 'not implemented' },
  ];

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayNineteen.partOne(input)).toBe(expectedOutput);
    });
  });
});
