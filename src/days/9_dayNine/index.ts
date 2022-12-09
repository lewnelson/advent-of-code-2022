// https://adventofcode.com/2022/day/9
import { Main } from '~/types';
import { renderHistory } from './debuggingTools';
import { History, Direction } from './types';
import { getDistance, getLastPositions, serializeCoordinate } from './utils';

const debug = process.env.DEBUG === 'true';

export const partOne: Main = input => {
  const origin = serializeCoordinate({ x: 0, y: 0 });
  const history: History = [{ head: origin, tail: origin }];

  const move = (direction: Direction): void => {
    const { head, tail } = getLastPositions(history);
    const newHead = { ...head };
    const newTail = { ...tail };
    if (direction === 'R') newHead.x += 1;
    if (direction === 'U') newHead.y += 1;
    if (direction === 'L') newHead.x -= 1;
    if (direction === 'D') newHead.y -= 1;
    const distance = getDistance(newHead, newTail);
    if (distance > 2) {
      if (direction === 'R') {
        newTail.x += 1;
        newTail.y = newHead.y;
      }
      if (direction === 'L') {
        newTail.x -= 1;
        newTail.y = newHead.y;
      }
      if (direction === 'U') {
        newTail.x = newHead.x;
        newTail.y += 1;
      }
      if (direction === 'D') {
        newTail.x = newHead.x;
        newTail.y -= 1;
      }
    } else if (distance === 2 && (newHead.x === newTail.x || newHead.y === newTail.y)) {
      if (direction === 'R') newTail.x += 1;
      if (direction === 'L') newTail.x -= 1;
      if (direction === 'U') newTail.y += 1;
      if (direction === 'D') newTail.y -= 1;
    }

    history.push({ head: serializeCoordinate(newHead), tail: serializeCoordinate(newTail), direction });
  };

  input.split('\n').forEach(line => {
    const [direction, n] = line.split(' ');
    new Array(Number(n)).fill(0).forEach(() => move(direction as Direction));
  });

  const uniquePositions = new Set(history.map(({ tail }) => tail));
  if (debug) renderHistory(history);
  return uniquePositions.size;
};
