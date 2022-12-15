// https://adventofcode.com/2022/day/15
import { Main } from '~/types';

type Coordinate = [number, number];
type SensorData = {
  sensor: Coordinate;
  beacon: Coordinate;
}

const extractCoordinates = (line: string): Coordinate => {
  const matches = line.match(/(x=-?[\d]+|y=-?[\d]+)/g);
  if (!matches) throw new Error(`Invalid input: ${line}`);
  const coordinates = matches.map(coordinate => coordinate.replace(/(x=|y=)/, '')).map(v => parseInt(v));
  if (coordinates.length !== 2) throw new Error(`Invalid input: ${line}`);
  return coordinates as Coordinate;
};

const getSensorData = (input: string): SensorData[] => {
  return input.split('\n').map(line => {
    const [sensor, beacon] = line.split(':');
    return {
      sensor: extractCoordinates(sensor),
      beacon: extractCoordinates(beacon),
    };
  });
};

const getDistance = (a: Coordinate, b: Coordinate): number => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const getSensorIndexCoveringCoordinate = (data: SensorData[], coordinate: Coordinate): number => {
  const sensorData = [...data];
  for (let i = 0; i < sensorData.length; i++) {
    const { sensor, beacon } = sensorData[i];
    const beaconDistance = getDistance(sensor, beacon);
    const coordinateDistance = getDistance(sensor, coordinate);
    if (coordinateDistance <= beaconDistance) return i;
  }

  return -1;
};

const canBeaconBePlacedAt = (data: SensorData[], coordinate: Coordinate): boolean => {
  return getSensorIndexCoveringCoordinate(data, coordinate) === -1;
};

const getBoundaries = (sensorData: SensorData[]): [Coordinate, Coordinate] => {
  return sensorData.reduce((boundaries, { sensor, beacon }) => {
    const distance = getDistance(sensor, beacon);
    return [
      [Math.min(boundaries[0][0], sensor[0] - distance), Math.min(boundaries[0][1], sensor[1] - distance)],
      [Math.max(boundaries[1][0], sensor[0] + distance), Math.max(boundaries[1][1], sensor[1] + distance)],
    ];
  }, [sensorData[0].sensor, sensorData[0].sensor] as [Coordinate, Coordinate]);
};

export const partOne: Main = input => {
  const sensorData = getSensorData(input);
  const [[minX], [maxX, maxY]] = getBoundaries(sensorData);
  const rowToCheck = maxY >= 2000000 ? 2000000 : 10;
  const beacons = new Set(sensorData.map(({ beacon }) => beacon.join(',')));
  let total = 0;
  for (let x = minX; x <= maxX; x++) {
    const coordinate = [x, rowToCheck] as Coordinate;
    if (!beacons.has(coordinate.join(',')) && !canBeaconBePlacedAt(sensorData, coordinate)) total++;
  };

  return total;
};
