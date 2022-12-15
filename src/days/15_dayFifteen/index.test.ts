import * as dayFifteen from './';
import { TestCase } from '~/types';

const inputA = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

describe('dayFifteen', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'for the given sensor data the number of positions on row 10 where a beacon cannot possibly be is 26', input: inputA, expectedOutput: 26 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFifteen.partOne(input)).toBe(expectedOutput);
    });
  });

  describe('partTwo', () => {
    const testCases: TestCase[] = [
      { description: 'for tuning frequencty of the distress signal is 56000011', input: inputA, expectedOutput: 56000011 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayFifteen.partTwo(input)).toBe(expectedOutput);
    });
  });
});
