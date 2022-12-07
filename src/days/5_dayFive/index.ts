// https://adventofcode.com/2022/day/5
import { Main } from '~/types';

interface ParsedInput {
  stacks: string[][];
  instructions: string[];
}

interface Instruction {
  move: number;
  from: number;
  to: number;
}

const emptyInput: ParsedInput = { stacks: [], instructions: [] };

const getTotalStacks = (lastLine: string): number => {
  const matches = lastLine.match(/([\d]+)\s+$/);
  return matches ? parseInt(matches[1]) : 0;
};

const buildStacks = (totalStacks: number, lines: string[], stacks: ParsedInput['stacks'] = []): ParsedInput['stacks'] => {
  if (lines.length === 0) {
    return stacks.map(stack => {
      const reversedStack = [...stack];
      reversedStack.reverse();
      return reversedStack;
    });
  }

  const [nextLine, ...restOfLines] = lines;
  for (let i = 0; i < totalStacks; i++) {
    const j = i * 4 - 1;
    const k =  j + 4;
    const nextCharSet = nextLine.slice(Math.max(j, 0), k);
    const nextCharMatch = nextCharSet.match(/([A-Z])/i);
    if (nextCharMatch && nextCharMatch[1]) {
      const nextChar = nextCharMatch[1];
      if (!stacks[i]) stacks[i] = [];
      stacks[i].push(nextChar);
    }
  }

  return buildStacks(totalStacks, restOfLines, stacks);
};

const parseInstruction = (instructionInput: string): Instruction | null => {
  const matches = instructionInput.match(/([\d]+)/g);
  if (!matches) return null;
  return {
    move: parseInt(matches[0]),
    from: parseInt(matches[1]),
    to: parseInt(matches[2]),
  };
};

const parseInput = (input: string): ParsedInput => {
  const [stacksInput, instructionsInput] = input.split('\n\n');
  const stacksLines = stacksInput.split('\n');
  const lastStackLine = stacksLines.pop();
  if (!lastStackLine) return emptyInput;
  const totalStacks = getTotalStacks(lastStackLine);
  const stacks = buildStacks(totalStacks, stacksLines);
  return { stacks, instructions: instructionsInput.split('\n') };
};

export const partOne: Main = input => {
  const { stacks, instructions } = parseInput(input);
  instructions.forEach(line => {
    const instruction = parseInstruction(line);
    if (!instruction) return;

    for (let i = 0; i < instruction.move; i++) {
      const fromStack = stacks[instruction.from - 1];
      const toStack = stacks[instruction.to - 1];
      const nextItem = fromStack.pop();
      if (nextItem) toStack.push(nextItem);
    }
  });

  return stacks.reduce((message, stack) => {
    const item = stack.pop();
    return `${message}${item ?? ''}`;
  }, '');
};
