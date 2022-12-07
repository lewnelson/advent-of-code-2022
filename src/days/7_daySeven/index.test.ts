import * as daySeven from './';
import { TestCase } from '~/types';

const inputA = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

describe('daySeven', () => {
  describe('partOne', () => {
    const testCases: Omit<TestCase, 'description'>[] = [
      { input: inputA, expectedOutput: 95437 },
    ];

    test.each(testCases)('for the given input the output is $expectedOutput', ({ input, expectedOutput }) => {
      expect(daySeven.partOne(input)).toBe(expectedOutput);
    });
  });

  describe('partTwo', () => {
    const testCases: Omit<TestCase, 'description'>[] = [
      { input: inputA, expectedOutput: 24933642 },
    ];

    test.each(testCases)('for the given input the output is $expectedOutput', ({ input, expectedOutput }) => {
      expect(daySeven.partTwo(input)).toBe(expectedOutput);
    });
  });
});
