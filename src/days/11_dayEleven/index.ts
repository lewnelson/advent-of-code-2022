// https://adventofcode.com/2022/day/11
import { Main } from '~/types';
import { Monkey } from './monkey';

type Monkeys = Record<number, Monkey>;

const simulateRound = (monkeys: Monkeys) => {
  // Had to look this up, I didn't know about this maths trick
  // without it the BigInts would overflow
  const modProd = Object.values(monkeys).reduce((prod: number, monkey: Monkey): number => prod * monkey.divisor, 1)
  Object.values(monkeys).forEach(monkey => {
    while (monkey.hasItems) {
      monkey.pickUpItem();
      monkey.inspectItem();
      monkey.getBoredOfItem();
      const [item, recipient] = monkey.flingItem();
      monkeys[recipient].catchItem(item % BigInt(modProd));
    }
  });
};

const simulateRounds = (monkeys: Monkeys, n: number) => {
  for (let i = 0; i < n; i++) {
    simulateRound(monkeys);
  }
};

const getMostActiveMonkeys = (monkeys: Monkeys, n: number) => {
  const monkeysList = Object.values(monkeys);
  monkeysList.sort((a, b) => b.inspectedItemsCount - a.inspectedItemsCount);
  return monkeysList.slice(0, n);
};

const getMonkeysFromRawInput = (input: string, onGetsBoredOfItem?: (item: bigint) => bigint) => {
  const onGetsBored = onGetsBoredOfItem || ((item: bigint) => item);
  return input.split('\n\n').reduce((monkeys, input) => {
    const monkey = new Monkey(input, onGetsBored);
    return { ...monkeys, [monkey.index]: monkey };
  }, {} as Monkeys);
};

const getProductOfTwoMostActiveMonkeysInspectedItemsCount = (monkeys: Monkeys) => {
  const [mostActiveMonkeyA, mostActiveMonkeyB] = getMostActiveMonkeys(monkeys, 2);
  return mostActiveMonkeyA.inspectedItemsCount * mostActiveMonkeyB.inspectedItemsCount;
};

export const partOne: Main = input => {
  const onGetsBoredOfItem = (item: bigint) => {
    const result = item / BigInt(3);
    return BigInt(result.toString().split('.')[0]);
  };

  const monkeys = getMonkeysFromRawInput(input, onGetsBoredOfItem);
  simulateRounds(monkeys, 20);
  return getProductOfTwoMostActiveMonkeysInspectedItemsCount(monkeys);
};

export const partTwo: Main = input => {
  const monkeys = getMonkeysFromRawInput(input);
  simulateRounds(monkeys, 10000);
  return getProductOfTwoMostActiveMonkeysInspectedItemsCount(monkeys);
};
