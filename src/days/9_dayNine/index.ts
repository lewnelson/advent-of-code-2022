// https://adventofcode.com/2022/day/9
import { Main } from '~/types';
import { renderHistory } from './debuggingTools';
import { History, Direction } from './types';
import { getDistance, serializeCoordinate, unserializeCoordinate } from './utils';

const debug = process.env.DEBUG === 'true';

const getNextPositions = (lastPositions: History[number], direction: Direction): History[number] => {
  const [head, ...knots] = lastPositions.knots.map(unserializeCoordinate);
  const newHead = { ...head };
  if (direction === 'R') newHead.x += 1;
  if (direction === 'U') newHead.y += 1;
  if (direction === 'L') newHead.x -= 1;
  if (direction === 'D') newHead.y -= 1;
  const newKnots = [newHead, ...knots];
  for (let i = 0; i < knots.length; i++) {
    const knotHead = newKnots[i];
    const knotTail = { ...newKnots[i + 1] };
    const distance = getDistance(knotHead, knotTail);
    if (distance > 2) {
      if (direction === 'R') {
        knotTail.x += 1;
        knotTail.y = knotHead.y;
      }
      if (direction === 'L') {
        knotTail.x -= 1;
        knotTail.y = knotHead.y;
      }
      if (direction === 'U') {
        knotTail.x = knotHead.x;
        knotTail.y += 1;
      }
      if (direction === 'D') {
        knotTail.x = knotHead.x;
        knotTail.y -= 1;
      }
    } else if (distance === 2 && (knotHead.x === knotTail.x || knotHead.y === knotTail.y)) {
      if (direction === 'R') knotTail.x += 1;
      if (direction === 'L') knotTail.x -= 1;
      if (direction === 'U') knotTail.y += 1;
      if (direction === 'D') knotTail.y -= 1;
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

const getUniquePositionsForTail = (history: History, input: string) => {
  input.split('\n').forEach(line => {
    const [direction, n] = line.split(' ');
    for (let i = 0; i < Number(n); i++) {
      const nextPositons = getNextPositions(history[history.length - 1], direction as Direction);
      history.push(nextPositons);
    }
  });

  const uniquePositions = new Set(history.map(({ knots }) => knots[knots.length - 1]));
  if (debug) renderHistory(history);
  return uniquePositions.size;
};

export const partOne: Main = input => {
  const history = createHistory(2);
  return getUniquePositionsForTail(history, input);
};
