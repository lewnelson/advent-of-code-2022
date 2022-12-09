import { serializeCoordinate, unserializeCoordinate } from './utils';
import { History } from './types';

export const renderHistory = (history: History): void => {
  const bounds = history.map(({ knots: [head] }) => unserializeCoordinate(head))
    .reduce((acc, { x, y }) => ({
      maxX: Math.max(acc.maxX, x),
      maxY: Math.max(acc.maxY, y),
      minX: Math.min(acc.minX, x),
      minY: Math.min(acc.minY, y),
    }), { maxX: 0, maxY: 0, minX: 0, minY: 0 });

  const gridSize = { x: bounds.maxX - bounds.minX + 1, y: bounds.maxY - bounds.minY + 1 };
  const offsets = { x: Math.min(bounds.minX, 0), y: Math.min(bounds.minY, 0) };

  const lines: string[] = [];
  history.forEach(({ knots: [head, ...knots], direction }) => {
    const tail = knots.pop();
    const grid = new Array(gridSize.y).fill(null).map((_, row) => {
      const y = gridSize.y - row + offsets.y - 1;
      return new Array(gridSize.x).fill(null).map((_, col) => {
        const x = col + offsets.x;
        const serializedCoordinate = serializeCoordinate({ x, y });
        if (head === serializedCoordinate) return 'H';
        if (tail === serializedCoordinate) return 'T';
        const knotIndex = knots.indexOf(serializedCoordinate);
        if (knotIndex > -1) return knotIndex + 1;
        return '.';
      }).join('');
    });

    if (direction) {
      lines.push(`Move ${direction}`);
    } else {
      lines.push('Starting position');
    }
    lines.push('\n');
    lines.push(grid.join('\n'));
    lines.push('\n');
  });

  console.log(lines.join('\n'));
};
