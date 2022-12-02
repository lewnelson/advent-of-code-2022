import * as dayOne from './';
import { TestCase } from '~/types';

const inputA = `1000
2000
3000

4000

5000
6000

7000
8000
9000`;

const inputB = '';

const inputC = `1000
2000
3000

4000

5000
6000

7000

5000
6000`;

describe('dayOne', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      {
        description: 'Where the last elf is carrying the most at 24000',
        input: inputA,
        expectedOutput: 24000,
      },
      {
        description: 'When there is no input the output is 0',
        input: inputB,
        expectedOutput: 0,
      },
      {
        description: 'Where more than one elf has the same amount of calories and they are carrying the most',
        input: inputC,
        expectedOutput: 11000,
      },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayOne.partOne(input)).toBe(expectedOutput);
    });
  });
});
