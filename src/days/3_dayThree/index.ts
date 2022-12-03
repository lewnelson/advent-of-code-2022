// https://adventofcode.com/2022/day/3
import { Main } from '~/types';

const findCommonCharactersInTwoStrings = (a: string, b: string): string[] => {
  const aChars = a.split('');
  const bChars = b.split('');
  const commonChars = aChars.filter((char) => bChars.includes(char));
  return commonChars;
};

const findCommonCharacters = (...strings: string[]): string[] => {
  const [firstString, secondString, ...restOfStrings] = strings;
  const commonChars = findCommonCharactersInTwoStrings(firstString, secondString);
  return restOfStrings.reduce((commonChars, string) => {
    return findCommonCharactersInTwoStrings(commonChars.join(''), string);
  }, commonChars);
};

const findFirstCommonCharacter = (...strings: string[]): string | undefined => {
  return findCommonCharacters(...strings)[0];
};

const getNumericalRepresentation = (char: string): number => {
  const charCode = char.charCodeAt(0);
  if (charCode >= 97) return charCode - 96;
  return charCode - 38;
};

export const partOne: Main = input => {
  return input.split('\n').reduce((sum, line) => {
    if (!line) return sum;
    const [compartmentOne, compartmentTwo] = [line.slice(0, line.length / 2), line.slice(line.length / 2)];
    const commonCharacter = findFirstCommonCharacter(compartmentOne, compartmentTwo);
    if (!commonCharacter) return sum;
    const n = getNumericalRepresentation(commonCharacter);
    return sum + n;
  }, 0);
};

export const partTwo: Main = input => {
  const groups = input.split('\n').reduce((groups, line) => {
    if (!line) return [];
    const currentGroup = groups[groups.length - 1];
    if (!currentGroup || currentGroup.length === 3) {
      return [...groups, [line]];
    }

    return [...groups.slice(0, groups.length - 1), [...currentGroup, line]];
  }, [] as string[][]);

  return groups.reduce((sum, group) => {
    const commonCharacter = findFirstCommonCharacter(...group);
    if (!commonCharacter) return sum;
    const n = getNumericalRepresentation(commonCharacter);
    return sum + n;
  }, 0);
};
