// https://adventofcode.com/2022/day/9
import { Main } from '~/types';
import { renderHistory } from './debuggingTools';
import { History, Direction, Coordinate } from './types';
import { getAxisForGreatestDistance, getDistance, serializeCoordinate, unserializeCoordinate } from './utils';

const debug = process.env.DEBUG === 'true';

const getNewPosition = (oldPositon: Coordinate, direction: Direction): Coordinate => {
  const newPosition = { ...oldPositon };
  if (direction === 'R') newPosition.x += 1;
  if (direction === 'U') newPosition.y += 1;
  if (direction === 'L') newPosition.x -= 1;
  if (direction === 'D') newPosition.y -= 1;
  return newPosition;
};

const getNextPositions = (lastPositions: History[number], direction: Direction): History[number] => {
  const [head, ...knots] = lastPositions.knots.map(unserializeCoordinate);
  const newHead = getNewPosition(head, direction);
  const newKnots = [newHead, ...knots];
  for (let i = 0; i < knots.length; i++) {
    const knotHead = newKnots[i];
    const knotTail = { ...newKnots[i + 1] };
    const distance = getDistance(knotHead, knotTail);
    // If the knot needs to move in a line
    if (distance === 2 && (knotHead.x === knotTail.x || knotHead.y === knotTail.y)) {
      const furthestAxis = getAxisForGreatestDistance(knotHead, knotTail);
      if (furthestAxis === 'x') {
        knotTail.x += knotHead.x > knotTail.x ? 1 : -1;
        knotTail.y = knotHead.y;
      } else {
        knotTail.x = knotHead.x;
        knotTail.y += knotHead.y > knotTail.y ? 1 : -1;
      }
    // If the knot needs to move diagonally
    } else if (distance > 2) {
      knotTail.x += knotHead.x > knotTail.x ? 1 : -1;
      knotTail.y += knotHead.y > knotTail.y ? 1 : -1;
    }

    newKnots.splice(i + 1, 1, knotTail);
  }

  return { knots: newKnots.map(serializeCoordinate), direction };
};

const createHistory = (totalKnots: number) => {
  const origin = serializeCoordinate({ x: 0, y: 0 });
  const history: History = [{ knots: new Array(totalKnots).fill(null).map(() => origin) }];
  return history;
};

const playOutMoves = (totalKnots: number, input: string) => {
  const history = createHistory(totalKnots);
  input.split('\n').forEach(line => {
    const [direction, n] = line.split(' ');
    for (let i = 0; i < Number(n); i++) {
      const nextPositons = getNextPositions(history[history.length - 1], direction as Direction);
      history.push(nextPositons);
    }
  });

  return history;
};

const getUniquePositionsForKnot = (history: History, knotIndex: number) => {
  const uniquePositionsSet = new Set(history.map(({ knots }) => knots[knotIndex]));
  const uniquePositions: string[] = [];
  uniquePositionsSet.forEach(position => uniquePositions.push(position));
  return uniquePositions;
};

export const partOne: Main = input => {
  const history = playOutMoves(2, input);
  const uniquePositions = getUniquePositionsForKnot(history, 1);
  if (debug) renderHistory(history, uniquePositions);
  return uniquePositions.length;
};

export const partTwo: Main = input => {
  const history = playOutMoves(10, input);
  const uniquePositions = getUniquePositionsForKnot(history, 9);
  if (debug) renderHistory(history, uniquePositions);
  return uniquePositions.length;
};
