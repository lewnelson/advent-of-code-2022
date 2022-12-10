export type Direction = 'R' | 'U' | 'L' | 'D';

export type Axis = 'x' | 'y';

export type History = { knots: string[]; direction?: Direction }[];

export type Coordinate = { x: number; y: number };
