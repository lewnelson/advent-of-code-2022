// https://adventofcode.com/2022/day/3
import { Main } from '~/types';

const findCommonCharacters = (a: string, b: string): string[] => {
  const aChars = a.split('');
  const bChars = b.split('');
  const commonChars = aChars.filter((char) => bChars.includes(char));
  return commonChars;
};

const findFirstCommonCharacter = (a: string, b: string): string | undefined => {
  return findCommonCharacters(a, b)[0];
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
    if (!commonCharacter) {
      return sum;
    }

    const n = getNumericalRepresentation(commonCharacter);
    return sum + n;
  }, 0);
};
