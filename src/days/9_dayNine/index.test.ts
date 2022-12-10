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

const inputB = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

describe('dayNine', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'for the given instructions the tail visits 13 different positions at least once', input: inputA, expectedOutput: 13 },
      { description: 'for the given instructions the tail visits 88 different positions at least once', input: inputB, expectedOutput: 88 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayNine.partOne(input)).toBe(expectedOutput);
    });
  });

  describe('partTwo', () => {
    const testCases: TestCase[] = [
      { description: 'for the given instructions the tail never moves so only one position is visited', input: inputA, expectedOutput: 1 },
      { description: 'for the given instructions the tail visits 36 different positions at least once', input: inputB, expectedOutput: 36 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayNine.partTwo(input)).toBe(expectedOutput);
    });
  });
});
