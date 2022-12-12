// https://adventofcode.com/2022/day/12
import { Main } from '~/types';

type Index = number;
type StepCount = number;
type Path = [Index, StepCount];

type CanMoveFromCharToChar = (grid: string, from: number, to: number) => boolean;

interface ShortestPathInput {
  grid: string;
  nColumns: number;
  start: number;
  canMoveToChar: CanMoveFromCharToChar;
  hasReachedEnd: (index: number) => boolean;
}

const getShortestPath = ({ grid, nColumns, start, hasReachedEnd, canMoveToChar }: ShortestPathInput) => {
  const hasVisited = (visited: number[], index: number) => visited.includes(index);

  const canMoveLeft = (visited: number[], grid: string) => (index: number) => !hasVisited(visited, index - 1) && index % nColumns !== 0 && canMoveToChar(grid, index, index - 1);
  const canMoveRight = (visited: number[], grid: string) => (index: number) => !hasVisited(visited, index + 1) && (index + 1) % nColumns !== 0 && canMoveToChar(grid, index, index + 1);
  const canMoveUp = (visited: number[], grid: string) => (index: number) => !hasVisited(visited, index - nColumns) && index >= nColumns && canMoveToChar(grid, index, index - nColumns);
  const canMoveDown = (visited: number[], grid: string) => (index: number) => !hasVisited(visited, index + nColumns) && index < grid.length - nColumns && canMoveToChar(grid, index, index + nColumns);

  const visited: number[] = [start];
  let paths: Path[] = [[start, 0]];
  let shortestPath: number = Infinity;
  let prevVisited: number[] = [];
  while (shortestPath === Infinity && prevVisited.length !== visited.length) {
    prevVisited = [...visited];
    let i = 0;
    const nextPaths = [];
    while (paths[i]) {
      const currentPath = paths[i];
      const [currentIndex, steps] = currentPath;
      if (hasReachedEnd(currentIndex)) {
        shortestPath = steps;
        break;
      }

      const calculateNextPaths: [number, (index: number) => boolean][] = [
        [currentIndex - 1, canMoveLeft(visited, grid)],
        [currentIndex + nColumns, canMoveDown(visited, grid)],
        [currentIndex + 1, canMoveRight(visited, grid)],
        [currentIndex - nColumns, canMoveUp(visited, grid)],
      ];

      const nextPathsIndexes = calculateNextPaths.map(([index, canMove]) => canMove(currentIndex) ? index : undefined).filter(index => index !== undefined) as number[];
      visited.push(...nextPathsIndexes);
      nextPaths.push(...nextPathsIndexes.map(index  => [index, steps + 1] as Path));
      i++;
    }

    paths = nextPaths;
  }

  return shortestPath;
};

export const partOne: Main = input => {
  const canMoveToChar: CanMoveFromCharToChar = (grid, from, to) => {
    return grid.charCodeAt(to) - grid.charCodeAt(from) <= 1;
  };

  let grid = input.replace(/\n/g, '');
  const start = grid.indexOf('S');
  const end = grid.indexOf('E');
  grid = grid.replace(/S/, 'a').replace(/E/, 'z');
  const nColumns = input.slice(0, input.indexOf('\n')).length;
  return getShortestPath({
    grid,
    nColumns,
    start,
    canMoveToChar,
    hasReachedEnd: (index: number) => index === end,
  });
};

export const partTwo: Main = input => {
  const canMoveToChar: CanMoveFromCharToChar = (grid, from, to) => {
    return grid.charCodeAt(from) - grid.charCodeAt(to) <= 1;
  };

  const nColumns = input.slice(0, input.indexOf('\n')).length;
  let grid = input.replace(/\n/g, '');
  const start = grid.indexOf('E');
  grid = grid.replace(/S/, 'a').replace(/E/, 'z');

  const shortestPath = getShortestPath({
    grid,
    nColumns,
    start,
    canMoveToChar,
    hasReachedEnd: (index: number) => grid[index] === 'a',
  });

  return shortestPath;
};
