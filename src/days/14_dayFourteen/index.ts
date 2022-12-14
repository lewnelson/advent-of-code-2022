// https://adventofcode.com/2022/day/14
import { Main } from '~/types';

const Rock = '#';
const Sand = 'O';

type Point = typeof Rock | typeof Sand;
type X = string;
type Y = string;
type Coordinate = `${X},${Y}`;
type Points = Record<Coordinate, Point>;

const getCoordinate = (x: number, y: number): Coordinate => `${x},${y}`;

const down = ([x, y]: [x: number, y: number]): [number, number] => [x, y + 1];
const downLeft = ([x, y]: [x: number, y: number]): [number, number] => [x - 1, y + 1];
const downRight = ([x, y]: [x: number, y: number]): [number, number] => [x + 1, y + 1];

const dropSand = (points: Points, lowestRock: number) => {
  const position = [500, 0] as [number, number];
  let canMove = true;
  while (canMove) {
    const nextPositions = [down(position), downLeft(position), downRight(position)];
    const nextPosition = nextPositions.reduce((nextPosition, position) => {
      if (nextPosition) return nextPosition;
      if (!points[getCoordinate(...position)]) return position;
      return nextPosition;
    }, null as [number, number] | null);

    if (!nextPosition) {
      canMove = false;
      points[getCoordinate(...position)] = Sand;
    } else {
      position[0] = nextPosition[0];
      position[1] = nextPosition[1];
      if (position[1] > lowestRock) return null;
    }
  }

  return position;
};

const getPoints = (input: string) => {
  return input.split('\n').reduce((points, line) => {
    const coordinates = line.split(' -> ').map(coordinate => coordinate.split(',').map(Number) as [number, number]);
    return {
      ...points,
      ...coordinates.reduce((points, start, index) => {
        const end = coordinates[index + 1];
        if (!end) return points;
        const [startX, startY] = start;
        const [endX, endY] = end;
        const movingAxis = startX === endX ? 'y' : 'x';
        const newPoints = { ...points };
        new Array(Math.abs(movingAxis === 'y' ? startY - endY : startX - endX) + 1).fill(0).forEach((_, index) => {
          const x = movingAxis === 'y' ? startX : startX < endX ? startX + index : startX - index;
          const y = movingAxis === 'x' ? startY : startY < endY ? startY + index : startY - index;
          newPoints[getCoordinate(x, y)] = Rock;
        });

        return newPoints;
      }, {} as Points)
    };
  }, {} as Points);
};

const getLowestRock = (points: Points) => {
  return (Object.keys(points) as Coordinate[]).reduce((lowestRock, coordinate) => {
    if (points[coordinate] !== Rock) return lowestRock;
    const [, y] = coordinate.split(',').map(Number) as [number, number];
    return Math.max(lowestRock, y);
  }, 0);
};

const getTotalSandDropped = (points: Points, lowestRock: number) => {
  let totalSandDropped = 0;
  let foundVoid = false;
  while (!foundVoid) {
    const position = dropSand(points, lowestRock);
    if (!position) {
      foundVoid = true;
    } else {
      totalSandDropped += 1;
    }
  }

  return totalSandDropped;
};

export const partOne: Main = input => {
  const points = getPoints(input);
  const lowestRock = getLowestRock(points);
  return getTotalSandDropped(points, lowestRock);
};
