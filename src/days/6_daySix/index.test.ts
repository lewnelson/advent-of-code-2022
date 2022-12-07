import * as daySix from './';
import { TestCase } from '~/types';

describe('daySix', () => {
  describe('partOne', () => {
    const testCases: Omit<TestCase, 'description'>[] = [
      { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expectedOutput: 7 },
      { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expectedOutput: 5 },
      { input: 'nppdvjthqldpwncqszvftbrmjlhg', expectedOutput: 6 },
      { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expectedOutput: 10 },
      { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expectedOutput: 11 },
    ];

    test.each(testCases)('for the given input of $input the output is $expectedOutput', ({ input, expectedOutput }) => {
      expect(daySix.partOne(input)).toBe(expectedOutput);
    });
  });
});
