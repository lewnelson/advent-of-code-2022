import * as dayTwo from './';
import { TestCase } from '~/types';

const inputA = `A Y
B X
C Z`;

const inputB = '';

describe('dayTwo', () => {
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

  describe('partOne', () => {
    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayTwo.partOne(input)).toBe(expectedOutput);
    });
  });
});
