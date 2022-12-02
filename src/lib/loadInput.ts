import fs from 'fs';
import path from 'path';

export const loadInput = (directory: string): string => {
  const inputPath = path.join(directory, 'input.txt');
  return fs.readFileSync(inputPath, { encoding: 'utf8' }).toString() ?? '';
};
