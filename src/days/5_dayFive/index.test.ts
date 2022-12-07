import * as dayFive from './';
import { TestCase } from '~/types';

const inputA = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

describe('dayFive', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'For the given stack and instructions the output is CMZ', input: inputA, expectedOutput: 'CMZ' },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFive.partOne(input)).toBe(expectedOutput);
    });
  });
});
