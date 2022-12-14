import * as dayFourteen from './';
import { TestCase } from '~/types';

const inputA = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe('dayFourteen', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: '24 units of sand come to rest before the sand starts falling into the abyss', input: inputA, expectedOutput: 24 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFourteen.partOne(input)).toBe(expectedOutput);
    });
  });

  describe('partTwo', () => {
    const testCases: TestCase[] = [
      { description: '93 units of sand come to rest before the sand can no longer fall', input: inputA, expectedOutput: 93 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFourteen.partTwo(input)).toBe(expectedOutput);
    });
  });
});
