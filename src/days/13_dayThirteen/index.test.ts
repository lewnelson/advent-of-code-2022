import * as dayThirteen from './';
import { TestCase } from '~/types';

const inputA = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

describe('dayThirteen', () => {
  describe('partOne', () => {
    const testCases: TestCase[] = [
      { description: 'for the given packets the sum of the indices of the correctly ordered packets is 13', input: inputA, expectedOutput: 13 },
    ];

    test.each(testCases)('$description', ({ input, expectedOutput }) => {
      expect(dayThirteen.partOne(input)).toBe(expectedOutput);
    });
  });
});
