import { History } from './types';

export const serializeCoordinate = ({ x, y }: { x: number; y: number }): string => `${x},${y}`;
export const unserializeCoordinate = (s: string): { x: number; y: number } => {
  const [x, y] = s.split(',').map(Number);
  return { x, y };
};

export const getLastPositions = (history: History) => {
  const lastMove = history[history.length - 1];
  return { head: unserializeCoordinate(lastMove.head), tail: unserializeCoordinate(lastMove.tail) };
};

export const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }): number => {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx + dy;
};
