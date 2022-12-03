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
vjAwRtyoiPvj`;

describe('dayThree', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'For the given rucksacks the total is 157', input: inputA, expectedOutput: 157 },
      { description: 'For no input the total is 0', input: inputB, expectedOutput: 0 },
      { description: 'When a rucksack has more than one common character only the first common character is used', input: inputC, expectedOutput: 160 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayThree.partOne(input)).toBe(expectedOutput);
    });
  });

  describe('partTwo', () => {
    const testCases: TestCase[] = [
      { description: 'For the given rucksacks the group badge total is 70', input: inputA, expectedOutput: 70 },
      { description: 'For no input the total is 0', input: inputB, expectedOutput: 0 },
      { description: 'When a group has no common character', input: inputC, expectedOutput: 18 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayThree.partTwo(input)).toBe(expectedOutput);
    });
  })
});
