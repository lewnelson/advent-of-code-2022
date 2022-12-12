// https://adventofcode.com/2022/day/12
import { Main } from '~/types';

type Index = number;
type StepCount = number;
type Move = [Index, StepCount];

const renderVisited = (nColumns: number, grid: string, visited: number[]) => {
  let visitedGrid = '';
  for (let i = 0; i < grid.length; i++) {
    if (visited.includes(i)) {
      visitedGrid += grid[i];
    } else {
      visitedGrid += '.';
    }

    if (i > 0 && (i + 1) % nColumns === 0) visitedGrid += '\n';
  }

  console.log(visitedGrid);
};

interface ShortestPathInput {
  grid: string;
  nColumns: number;
  start: number;
  end: number;
}

const getShortestPath = ({ grid, nColumns, start, end }: ShortestPathInput) => {
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
