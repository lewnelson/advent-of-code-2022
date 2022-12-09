export type Direction = 'R' | 'U' | 'L' | 'D';

export type History = { knots: string[]; direction?: Direction }[];
