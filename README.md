# Advent of code 2022

Merry Christmas!

https://adventofcode.com/2022

## Getting started

If you don't have pnpm already installed

```
npm install -g pnpm
```

Install dependencies

```
pnpm install
```

Run tests for a particular set of days:

```shell
# Runs tests for days 1, 2, and 3
pnpm test:days 1 2 3

# Runs tests for all days
pnpm test:days

# Runs tests for day 5
pnpm test:days 5
```

Get the output for a particular challenge:

```shell
# Opens interactive CLI prompt to select day and part to run
pnpm day
```

## Structure

Each day of the challenge has a corresponding directory in `src/days/<day>`. Each directory contains the input in `input.txt` and the solutions in `index.ts`. Unit tests for the solutions to each parts of the challenge are in `index.test.ts`. The `src/days` directory was generated using `pnpm run setup` which created the boilerplate code.
