export type Direction = 'R' | 'U' | 'L' | 'D';

export type History = { head: string; tail: string; direction?: Direction }[];
