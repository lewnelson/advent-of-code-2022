// https://adventofcode.com/2022/day/11
import { Main } from '~/types';

namespace MonkeyBusiness {
  interface MonkeyParameters {
    index: number;
    items: number[];
    operation: (old: number) => number;
    test: (value: number) => boolean;
    onTrue: number;
    onFalse: number;
  }

  class ParserError extends Error {
    constructor(field: string, value: string) {
      super(`Unable to parse field: ${field}. Original value: ${value}`);
    }
  }

  const parseIndex = (name: string) => {
    const matches = name.match(/^Monkey\s(\d+):/);
    if (!matches) throw new ParserError('index', name);
    return parseInt(matches[1])
  };

  const parseItems = (startingItems: string) => {
    return startingItems.split(':')[1].trim().split(', ').map(item => parseInt(item));
  };

  const parseOperation = (operation: string) => {
    const matches = operation.match(/new\s=\s(.*)/);
    if (!matches) throw new ParserError('operation', operation);
    const formula = matches[1];
    const [left, operator, right] = formula.split(' ');
    return (old: number) => {
      const leftNumber = left === 'old' ? old : parseInt(left);
      const rightNumber = right === 'old' ? old : parseInt(right);
      switch (operator) {
        case '*':
          return leftNumber * rightNumber;
        case '+':
          return leftNumber + rightNumber;
        case '-':
          return leftNumber - rightNumber;
        case '/':
          return leftNumber / rightNumber;
        default:
          throw new ParserError('operation', operation);
      }
    };
  };

  const parseTest = (test: string) => {
    const matches = test.match(/divisible by (\d+)/);
    if (!matches) throw new ParserError('test', test);
    const divisor = parseInt(matches[1]);
    return (value: number) => value % divisor === 0;
  };

  const parseThrowToMonkeyIndex = (throwToMonkey: string) => {
    const matches = throwToMonkey.match(/throw to monkey (\d+)/);
    if (!matches) throw new ParserError('throwToMonkey', throwToMonkey);
    return parseInt(matches[1]);
  };

  const parseParameters = (parameters: string): MonkeyParameters => {
    const [name, startingItems, operation, test, onTrue, onFalse] = parameters.split('\n');
    return {
      index: parseIndex(name),
      items: parseItems(startingItems),
      operation: parseOperation(operation),
      test: parseTest(test),
      onTrue: parseThrowToMonkeyIndex(onTrue),
      onFalse: parseThrowToMonkeyIndex(onFalse),
    }
  };
  
  export class Monkey {
    private parameters: MonkeyParameters;
    private itemInHand?: number;
    private totalInspectedItems = 0;

    constructor(parameters: string) {
      this.parameters = parseParameters(parameters);
    }

    get index() {
      return this.parameters.index;
    }

    get hasItems() {
      return this.parameters.items.length > 0 || this.hasItemInHand;
    }

    get hasItemInHand() {
      return typeof this.itemInHand === 'number';
    }

    get inspectedItemsCount() {
      return this.totalInspectedItems;
    }

    pickUpItem() {
      this.itemInHand = this.parameters.items.shift();
      return this.itemInHand;
    }

    inspectItem() {
      if (!this.hasItemInHand) throw new Error('No item in hand, you need to pick one up first');
      this.itemInHand = this.parameters.operation(this.itemInHand!);
      this.totalInspectedItems++;
    }

    getBoredOfItem() {
      if (!this.hasItemInHand) throw new Error('No item in hand, you need to pick one up first');
      this.itemInHand = Math.floor(this.itemInHand! / 3);
    }

    flingItem() {
      if (!this.hasItemInHand) throw new Error('No item in hand, you need to pick one up first');
      const item = this.itemInHand!;
      const recipient = this.parameters.test(item) ? this.parameters.onTrue : this.parameters.onFalse;
      this.itemInHand = undefined;
      return [item, recipient];
    }

    catchItem(item: number) {
      this.parameters.items.push(item);
    }
  }
}

type Monkeys = Record<number, MonkeyBusiness.Monkey>;

const simulateRound = (monkeys: Monkeys) => {
  Object.values(monkeys).forEach(monkey => {
    while (monkey.hasItems) {
      monkey.pickUpItem();
      monkey.inspectItem();
      monkey.getBoredOfItem();
      const [item, recipient] = monkey.flingItem();
      monkeys[recipient].catchItem(item);
    }
  });
};

const getMostActiveMonkeys = (monkeys: Monkeys, n: number) => {
  const monkeysList = Object.values(monkeys);
  monkeysList.sort((a, b) => b.inspectedItemsCount - a.inspectedItemsCount);
  return monkeysList.slice(0, n);
};

export const partOne: Main = input => {
  const monkeys = input.split('\n\n').reduce((monkeys, input) => {
    const monkey = new MonkeyBusiness.Monkey(input);
    return { ...monkeys, [monkey.index]: monkey };
  }, {} as Monkeys);

  for (let i = 0; i < 20; i++) {
    simulateRound(monkeys);
  }

  const [mostActiveMonkeyA, mostActiveMonkeyB] = getMostActiveMonkeys(monkeys, 2);
  return mostActiveMonkeyA.inspectedItemsCount * mostActiveMonkeyB.inspectedItemsCount;
};
