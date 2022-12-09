import { unserializeCoordinate } from './utils';
import { History } from './types';

export const renderHistory = (history: History): void => {
  const bounds = history.map(({ head, tail }) => {
    const { x: xHead, y: yHead } = unserializeCoordinate(head);
    const { x: xTail, y: yTail } = unserializeCoordinate(tail);
    const maxX = Math.max(xHead, xTail);
    const maxY = Math.max(yHead, yTail);
    const minX = Math.min(xHead, xTail);
    const minY = Math.min(yHead, yTail);
    return { maxX, maxY, minX, minY };
  }).reduce((acc, { maxX, maxY, minX, minY }) => ({
    maxX: Math.max(acc.maxX, maxX),
    maxY: Math.max(acc.maxY, maxY),
    minX: Math.min(acc.minX, minX),
    minY: Math.min(acc.minY, minY),
  }), { maxX: 0, maxY: 0, minX: 0, minY: 0 });

  const gridSize = { x: bounds.maxX - bounds.minX + 1, y: bounds.maxY - bounds.minY + 1 };
  const offsets = { x: Math.min(bounds.minX, 0), y: Math.min(bounds.minY, 0) };

  const lines: string[] = [];
  history.forEach(({ head, tail, direction }) => {
    const { x: xHead, y: yHead } = unserializeCoordinate(head);
    const { x: xTail, y: yTail } = unserializeCoordinate(tail);
    const grid = new Array(gridSize.y).fill(null).map((_, row) => {
      const y = gridSize.y - row + offsets.y - 1;
      return new Array(gridSize.x).fill(null).map((_, col) => {
        const x = col + offsets.x;
        if (y === yHead && x === xHead) return 'H';
        if (y === yTail && x === xTail) return 'T';
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
