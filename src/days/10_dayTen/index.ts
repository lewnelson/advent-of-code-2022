// https://adventofcode.com/2022/day/10
import { Main } from '~/types';

interface BaseInstruction<T extends 'noop' | 'addx'> {
  type: T;
}

interface NoopInstruction extends BaseInstruction<'noop'> {}
interface AddxInstruction extends BaseInstruction<'addx'> {
  value: number;
}

type Instruction = NoopInstruction | AddxInstruction;

type OnTick = (cycleCount: number, x: number) => void;

const getInstructions = (input: string): Instruction[] => {
  return input.split('\n').reduce((instructions, instruction) => {
    const [type, value] = instruction.split(' ');
    switch (type) {
      case 'noop':
        return [...instructions, { type } as NoopInstruction];
      case 'addx':
        return [...instructions, { type, value: Number(value) } as AddxInstruction];
    }

    return instructions;
  }, [] as Instruction[]);
};

const processInstructions = (instructions: Instruction[], onTick: OnTick): void => {
  let cycleCount = 0;
  let x = 1;
  const tick = () => {
    cycleCount++;
    onTick(cycleCount, x);
  };

  instructions.forEach(instruction => {
    switch (instruction.type) {
      case 'noop':
        tick();
        break;
      case 'addx':
        tick();
        tick();
        x += instruction.value;
        break;
    }
  });
};

export const partOne: Main = input => {
  const instructions = getInstructions(input);
  let signalStrength = 0;
  processInstructions(instructions, (cycleCount, x) => {
    if ((cycleCount + 20) % 40 === 0) {
      signalStrength += x * cycleCount;
    }
  });

  return signalStrength;
};
