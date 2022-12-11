import * as dayEleven from './';
import { TestCase } from '~/types';

const inputA = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

describe('dayEleven', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'based on the monkey slinging simultation the value of monkey business is 10605', input: inputA, expectedOutput: 10605 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayEleven.partOne(input)).toBe(expectedOutput);
    });
  });

  describe('partTwo', () => {
    const testCases: TestCase[] = [
      { description: 'based on the monkey slinging simultation the value of monkey business is 2713310158', input: inputA, expectedOutput: 2713310158 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayEleven.partTwo(input)).toBe(expectedOutput);
    });
  });
});
