interface MonkeyParameters {
  index: number;
  items: bigint[];
  operation: (old: bigint) => bigint;
  test: (value: bigint) => boolean;
  onTrue: number;
  onFalse: number;
  divisor: number;
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
  return startingItems.split(':')[1].trim().split(', ').map(item => BigInt(item));
};

const parseOperation = (operation: string) => {
  const matches = operation.match(/new\s=\s(.*)/);
  if (!matches) throw new ParserError('operation', operation);
  const formula = matches[1];
  const [left, operator, right] = formula.split(' ');
  return (old: bigint) => {
    const leftNumber = left === 'old' ? old : BigInt(left);
    const rightNumber = right === 'old' ? old : BigInt(right);
    switch (operator) {
      case '*':
        return leftNumber * rightNumber;
      case '+':
        return leftNumber + rightNumber;
      default:
        throw new ParserError('operation', operation);
    }
  };
};

const parseDivisor = (test: string) => {
  const matches = test.match(/divisible by (\d+)/);
  if (!matches) throw new ParserError('test', test);
  const divisor = parseInt(matches[1]);
  return divisor;
};

const parseThrowToMonkeyIndex = (throwToMonkey: string) => {
  const matches = throwToMonkey.match(/throw to monkey (\d+)/);
  if (!matches) throw new ParserError('throwToMonkey', throwToMonkey);
  return parseInt(matches[1]);
};

const parseParameters = (parameters: string): MonkeyParameters => {
  const [name, startingItems, operation, test, onTrue, onFalse] = parameters.split('\n');
  const divisor = parseDivisor(test);
  return {
    index: parseIndex(name),
    items: parseItems(startingItems),
    operation: parseOperation(operation),
    test: (value: bigint) => value % BigInt(divisor) === BigInt(0),
    onTrue: parseThrowToMonkeyIndex(onTrue),
    onFalse: parseThrowToMonkeyIndex(onFalse),
    divisor,
  }
};

export class Monkey {
  private parameters: MonkeyParameters;
  private itemInHand?: bigint;
  private totalInspectedItems = 0;
  private onGetsBoredOfItem: (item: bigint) => bigint;

  constructor(parameters: string, onGetsBoredOfItem: (item: bigint) => bigint) {
    this.parameters = parseParameters(parameters);
    this.onGetsBoredOfItem = onGetsBoredOfItem;
  }

  get index() {
    return this.parameters.index;
  }

  get hasItems() {
    return this.parameters.items.length > 0 || this.hasItemInHand;
  }

  get hasItemInHand() {
    return this.itemInHand !== undefined;
  }

  get inspectedItemsCount() {
    return this.totalInspectedItems;
  }

  get divisor() {
    return this.parameters.divisor;
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
    if (!this.onGetsBoredOfItem) return;
    if (!this.hasItemInHand) throw new Error('No item in hand, you need to pick one up first');
    this.itemInHand = this.onGetsBoredOfItem(this.itemInHand!);
  }

  flingItem(): [bigint, number] {
    if (!this.hasItemInHand) throw new Error('No item in hand, you need to pick one up first');
    const item = this.itemInHand!;
    const recipient = this.parameters.test(item) ? this.parameters.onTrue : this.parameters.onFalse;
    this.itemInHand = undefined;
    return [item, recipient];
  }

  catchItem(item: bigint) {
    this.parameters.items.push(item);
  }
}
