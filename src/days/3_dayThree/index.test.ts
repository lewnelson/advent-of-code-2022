import * as dayThree from './';
import { TestCase } from '~/types';

const inputA = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const inputB = '';

const inputC = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
vjAwRtyoiPvj`;

describe('dayThree', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'For the given rucksacks the total is 157', input: inputA, expectedOutput: 157 },
      { description: 'For no input the total is 0', input: inputB, expectedOutput: 0 },
      { description: 'When a rucksack has more than one common character only the first common character is used', input: inputC, expectedOutput: 179 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayThree.partOne(input)).toBe(expectedOutput);
    });
  });
});
