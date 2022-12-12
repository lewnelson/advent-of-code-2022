// https://adventofcode.com/2022/day/12
import { Main } from '~/types';

type Index = number;
type StepCount = number;
type Move = [Index, StepCount];

interface ShortestPathInput {
  grid: string;
  nColumns: number;
  start: number;
  end: number;
  maxPathSize?: number
}

const getShortestPath = ({ grid, nColumns, start, end, maxPathSize }: ShortestPathInput) => {
  const canMoveToChar = (grid: string, from: number, to: number) => {
    return grid.charCodeAt(to) - grid.charCodeAt(from)  <= 1;
  };

  const hasVisited = (visited: number[], index: number) => visited.includes(index);

  const canMoveLeft = (visited: number[], grid: string) => (index: number) => !hasVisited(visited, index - 1) && index % nColumns !== 0 && canMoveToChar(grid, index, index - 1);
  const canMoveRight = (visited: number[], grid: string) => (index: number) => !hasVisited(visited, index + 1) && (index + 1) % nColumns !== 0 && canMoveToChar(grid, index, index + 1);
  const canMoveUp = (visited: number[], grid: string) => (index: number) => !hasVisited(visited, index - nColumns) && index >= nColumns && canMoveToChar(grid, index, index - nColumns);
  const canMoveDown = (visited: number[], grid: string) => (index: number) => !hasVisited(visited, index + nColumns) && index < grid.length - nColumns && canMoveToChar(grid, index, index + nColumns);

  const visited: number[] = [start];
  let moves: Move[] = [[start, 0]];
  let shortestPath: number = Infinity;
  let prevVisited: number[] = [];
  while (shortestPath === Infinity && prevVisited.length !== visited.length) {
    prevVisited = [...visited];
    const exhaustedMoveIndexes: number[] = [];
    let i = 0;
    while (moves[i]) {
      const currentMove = moves[i];
      const [currentIndex, steps] = currentMove;
      if (maxPathSize && steps > maxPathSize) break;
      if (currentIndex === end) {
        shortestPath = steps;
        break;
      }

      const calulateNextMoves: [number, (index: number) => boolean][] = [
        [currentIndex + 1, canMoveRight(visited, grid)],
        [currentIndex - nColumns, canMoveUp(visited, grid)],
        [currentIndex - 1, canMoveLeft(visited, grid)],
        [currentIndex + nColumns, canMoveDown(visited, grid)],
      ];

      const nextMoves = calulateNextMoves.map(([index, canMove]) => canMove(currentIndex) ? index : undefined).filter(index => index !== undefined) as number[];
      visited.push(...nextMoves);
      const [nextMove, ...branchedNextMoves] = nextMoves;

      if (nextMove === undefined) {
        exhaustedMoveIndexes.push(i);
      } else {
        branchedNextMoves.forEach(index => {
          const newMove: Move = [index, steps + 1];
          moves.push(newMove);
        });

        currentMove[0] = nextMove;
        currentMove[1] = steps + 1;
      }

      i++;
    }

    moves = moves.filter((_, index) => !exhaustedMoveIndexes.includes(index));
  }

  return shortestPath;
};

export const partOne: Main = input => {
  let grid = input.replace(/\n/g, '');
  const start = grid.indexOf('S');
  const end = grid.indexOf('E');
  grid = grid.replace(/S/, 'a').replace(/E/, 'z');
  const nColumns = input.slice(0, input.indexOf('\n')).length;
  return getShortestPath({
    grid,
    nColumns,
    start,
    end,
  });
};

export const partTwo: Main = input => {
  const nColumns = input.slice(0, input.indexOf('\n')).length;
  let grid = input.replace(/\n/g, '');
  const end = grid.indexOf('E');
  grid = grid.replace(/S/, 'a').replace(/E/, 'z');
  const startingPositions = grid.split('').reduce((acc, char, index) => {
    if (char === 'a') acc.push(index);
    return acc;
  }, [] as number[]);

  let shortestPath = Infinity;
  while (startingPositions.length > 0) {
    const nextPosition = startingPositions.shift()!;
    shortestPath = Math.min(shortestPath, getShortestPath({
      grid,
      nColumns,
      start: nextPosition,
      end,
      maxPathSize: shortestPath,
    }));
  }

  return shortestPath;
};
