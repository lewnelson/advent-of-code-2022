import * as dayTwo from './';
import { TestCase } from '~/types';

const inputA = `A Y
B X
C Z`;

const inputB = '';

describe('dayTwo', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      {
        description: 'When the total score should be 15',
        input: inputA,
        expectedOutput: 15,
      },
      {
        description: 'When no games are played',
        input: inputB,
        expectedOutput: 0,
      },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwo.partOne(input)).toBe(expectedOutput);
    });
  });

  describe('partTwo', () => {
    const testCases: TestCase[] = [
      {
        description: 'When the total score should be 12',
        input: inputA,
        expectedOutput: 12,
      },
      {
        description: 'When no games are played',
        input: inputB,
        expectedOutput: 0,
      },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwo.partTwo(input)).toBe(expectedOutput);
    });
  });
});
