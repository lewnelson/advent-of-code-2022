// https://adventofcode.com/2022/day/10
import { Main } from '~/types';

export const partOne: Main = input => {
  const instructions = input.split('\n');
  let cycleCount = 0;
  let signalStrength = 0;
  let x = 1;
  const tick = (x: number) => {
    cycleCount++;
    if ((cycleCount + 20) % 40 === 0) {
      signalStrength += x * cycleCount;
    }
  };

  instructions.forEach(instruction => {
    switch (true) {
      case instruction === 'noop':
        tick(x);
        break;
      case instruction.startsWith('addx'):
        tick(x);
        tick(x);
        x += Number(instruction.split(' ')[1]);
        break;
    }
  });

  return signalStrength;
};
