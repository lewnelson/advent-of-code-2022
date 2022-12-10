import fs from 'fs';
import path from 'path';
import { serializeCoordinate, unserializeCoordinate } from './utils';
import { History } from './types';

const writeLog = (content: string): void => {
  const filename = `debug_${Date.now()}.log`;
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, content, 'utf8');
};

export const renderHistory = (history: History, uniquePositions: string[], indexes?: number[]): void => {
  const maxIndex = indexes ? Math.max(...indexes) : history.length - 1;
  const historySlice = history.slice(0, maxIndex);
  const bounds = historySlice.map(({ knots: [head] }) => unserializeCoordinate(head))
    .reduce((acc, { x, y }) => ({
      maxX: Math.max(acc.maxX, x),
      maxY: Math.max(acc.maxY, y),
      minX: Math.min(acc.minX, x),
      minY: Math.min(acc.minY, y),
    }), { maxX: 0, maxY: 0, minX: 0, minY: 0 });

  const gridSize = { x: bounds.maxX - bounds.minX + 1, y: bounds.maxY - bounds.minY + 1 };
  const offsets = { x: Math.min(bounds.minX, 0), y: Math.min(bounds.minY, 0) };

  const lines: string[] = [];
  historySlice.forEach(({ knots: [head, ...knots], direction }, index) => {
    if (indexes && !indexes.includes(index)) return;
    const tail = knots.pop();
    const grid = new Array(gridSize.y).fill(null).map((_, row) => {
      const y = gridSize.y - row + offsets.y - 1;
      return new Array(gridSize.x).fill(null).map((_, col) => {
        const x = col + offsets.x;
        const serializedCoordinate = serializeCoordinate({ x, y });
        if (head === serializedCoordinate) return 'H';
        const knotIndex = knots.indexOf(serializedCoordinate);
        if (knotIndex > -1) return knotIndex + 1;
        if (tail === serializedCoordinate) return 'T';
        return '.';
      }).join('');
    });

    if (direction) {
      lines.push(`${index}: Move ${direction}`);
    } else {
      lines.push('Starting position');
    }
    lines.push('\n');
    lines.push(grid.join('\n'));
    lines.push('\n');
  });

  const highlightedGrid = new Array(gridSize.y).fill(null).map((_, row) => {
    const y = gridSize.y - row + offsets.y - 1;
    return new Array(gridSize.x).fill(null).map((_, col) => {
      const x = col + offsets.x;
      const serializedCoordinate = serializeCoordinate({ x, y });
      if (uniquePositions[0] === serializedCoordinate) return 'S';
      if (uniquePositions.includes(serializedCoordinate)) return '#';
      return '.';
    }).join('');
  });

  lines.push('Tail positions');
  lines.push('\n');
  lines.push(highlightedGrid.join('\n'));
  lines.push('\n');

  const content = lines.join('\n');
  writeLog(content);
};
