import { Axis, Coordinate } from './types';

export const serializeCoordinate = ({ x, y }: Coordinate): string => `${x},${y}`;
export const unserializeCoordinate = (s: string): Coordinate => {
  const [x, y] = s.split(',').map(Number);
  return { x, y };
};

export const getDistance = (a: Coordinate, b: Coordinate): number => {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx + dy;
};

export const getAxisForGreatestDistance = (a: Coordinate, b: Coordinate): Axis => {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx > dy ? 'x' : 'y';
};
