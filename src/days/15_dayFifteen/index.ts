// https://adventofcode.com/2022/day/15
import { Main } from '~/types';

type Coordinate = [number, number];
type Range = [number, number];
type SensorData = {
  sensor: Coordinate;
  beacon: Coordinate;
  distance: number;
};

type Boundary = [Coordinate, Coordinate];

const extractCoordinates = (line: string): Coordinate => {
  const matches = line.match(/(x=-?[\d]+|y=-?[\d]+)/g);
  if (!matches) throw new Error(`Invalid input: ${line}`);
  const coordinates = matches.map(coordinate => coordinate.replace(/(x=|y=)/, '')).map(v => parseInt(v));
  if (coordinates.length !== 2) throw new Error(`Invalid input: ${line}`);
  return coordinates as Coordinate;
};

const getDistance = (a: Coordinate, b: Coordinate): number => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const getSensorData = (input: string): SensorData[] => {
  return input.split('\n').map(line => {
    const [sensor, beacon] = line.split(':');
    const sensorCoordinates = extractCoordinates(sensor);
    const beaconCoordinates = extractCoordinates(beacon);
    const distance = getDistance(sensorCoordinates, beaconCoordinates);
    return {
      sensor: sensorCoordinates,
      beacon: beaconCoordinates,
      distance,
    };
  });
};

const getSensorIndexCoveringCoordinate = (data: SensorData[], coordinate: Coordinate): number => {
  const sensorData = [...data];
  for (let i = 0; i < sensorData.length; i++) {
    const { sensor, distance: beaconDistance } = sensorData[i];
    const coordinateDistance = getDistance(sensor, coordinate);
    if (coordinateDistance <= beaconDistance) return i;
  }

  return -1;
};

const canBeaconBePlacedAt = (data: SensorData[], coordinate: Coordinate): boolean => {
  return getSensorIndexCoveringCoordinate(data, coordinate) === -1;
};

const getBoundary = (sensorData: SensorData[]): Boundary => {
  return sensorData.reduce((boundaries, { sensor, beacon }) => {
    const distance = getDistance(sensor, beacon);
    return [
      [Math.min(boundaries[0][0], sensor[0] - distance), Math.min(boundaries[0][1], sensor[1] - distance)],
      [Math.max(boundaries[1][0], sensor[0] + distance), Math.max(boundaries[1][1], sensor[1] + distance)],
    ];
  }, [sensorData[0].sensor, sensorData[0].sensor] as Boundary);
};

const isLargeDataSet = (boundary: Boundary): boolean => boundary[1][1] >= 2000000;

export const partOne: Main = input => {
  const sensorData = getSensorData(input);
  const boundary = getBoundary(sensorData);
  const [[minX], [maxX]] = boundary;
  const rowToCheck = isLargeDataSet(boundary) ? 2000000 : 10;
  const beacons = new Set(sensorData.map(({ beacon }) => beacon.join(',')));
  let total = 0;
  for (let x = minX; x <= maxX; x++) {
    const coordinate = [x, rowToCheck] as Coordinate;
    if (!beacons.has(coordinate.join(',')) && !canBeaconBePlacedAt(sensorData, coordinate)) total++;
  };

  return total;
};

const unionRanges = (ranges: Range[]) => {
  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return ranges
    .reduce((ranges, range) => {
      const last = ranges[ranges.length - 1] || null;
      if (last && range[0] <= last[1] + 1) {
        if (last[1] < range[1]) {
          last[1] = range[1];
        }
      } else {
        ranges.push(range);
      }
      return ranges;
    }, [] as Range[]);
};

export const partTwo: Main = input => {
  const max = process.env.TESTING === 'true' ? 20 : 4000000;
  const data = getSensorData(input);

  let row = max;
  while (row > 0) {
    const filteredSensors = data
      .filter(({ sensor, distance }) => {
        return Math.abs(sensor[1] - row) < distance;
      })
      .map(({ sensor, distance }) => {
        const range = Math.abs(distance - Math.abs(sensor[1] - row));
        return [
          Math.max(0, sensor[0] - range),
          Math.min(max, sensor[0] + range),
        ] as Range;
      });

    const ranges = unionRanges(filteredSensors);
    if (ranges.length > 1) {
      const x = ranges[0][1];
      return (x + 1) * 4000000 + row;
    }

    row--;
  }

  throw new Error("No solution found");
};
