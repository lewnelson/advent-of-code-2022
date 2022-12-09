import * as dayNine from './';
import { TestCase } from '~/types';

const inputA = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

describe('dayNine', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'for the given instructions the tail visits 13 different positions at least once', input: inputA, expectedOutput: 13 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayNine.partOne(input)).toBe(expectedOutput);
    });
  });
});
