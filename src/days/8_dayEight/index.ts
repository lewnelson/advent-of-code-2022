// https://adventofcode.com/2022/day/8
import { Main } from '~/types';

interface CellProps {
  row: number;
  column: number;
  value: number;
}

type Direction = 'up' | 'down' | 'left' | 'right';

class Cell {
  public row: number;
  public column: number;
  public value: number;

  private _scenicScore: Record<Direction, number> = { up: 0, down: 0, left: 0, right: 0 };

  constructor({ row, column, value }: CellProps) {
    this.row = row;
    this.column = column;
    this.value = value;
  }

  setScenicScore(direction: Direction, score: number) {
    this._scenicScore[direction] = score;
  }

  get scenicScore() {
    const scores = Object.values(this._scenicScore);
    const [firstScore, ...restScores] = scores;
    return restScores.reduce((total, score) => total * score, firstScore);
  }

  toString() {
    return `x: ${this.column}; y: ${this.row}; value: ${this.value};`;
  }
}

class Grid {
  private grid: Cell[][];

  constructor(grid: number[][]) {
    this.grid = grid.map((row, rowIndex) => row.map((cell, columnIndex) => new Cell({ row: rowIndex, column: columnIndex, value: cell })));
  }

  private reverse(cells: Cell[]) {
    const reversed = [...cells];
    reversed.reverse();
    return reversed;
  }

  get rows() {
    return this.grid;
  }

  get columns() {
    return new Array(this.grid[0].length).fill(0).map((_, column) => this.grid.map(row => row[column]));
  }

  get rowsReversed() {
    const rows = [...this.rows];
    return rows.map(this.reverse);
  }

  get columnsReversed() {
    const columns = [...this.columns];
    return columns.map(this.reverse);
  }

  get cells(): Cell[] {
    return this.grid.flat();
  }
}

const parseGrid = (input: string): number[][] => {
  const rows = input.split('\n');
  return rows.map(row => row.split('').map(Number));
};

const getVisibleCells = (cells: Cell[]) => {
  const visibleCells: Cell[] = [];
  let biggestCellSoFar: Cell | undefined;
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    if (biggestCellSoFar === undefined || cell.value > biggestCellSoFar.value) {
      biggestCellSoFar = cell;
      visibleCells.push(cell);
    }
  }

  return visibleCells;
};

const populateScenicScores = (direction: Direction) => (cells: Cell[]) => {
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const nextCells = cells.slice(i + 1);
    for (let j = 0; j < nextCells.length; j++) {
      const nextCell = nextCells[j];
      cell.setScenicScore(direction, j + 1);
      if (cell.value <= nextCell.value) {
        break;
      }
    }
  }
};

export const partOne: Main = input => {
  const grid = new Grid(parseGrid(input));
  const { rows, columns, rowsReversed, columnsReversed } = grid;
  const visibleCells = [...rows, ...columns, ...rowsReversed, ...columnsReversed].reduce((visibleCells, cells) => {
    return [...visibleCells, ...getVisibleCells(cells)];
  }, []);

  const uniqueVisibleCells = new Set(visibleCells.map(cell => cell.toString()));
  return uniqueVisibleCells.size;
};

export const partTwo: Main = input => {
  const grid = new Grid(parseGrid(input));
  const { rows, columns, rowsReversed, columnsReversed } = grid;
  rows.forEach(populateScenicScores('right'));
  rowsReversed.forEach(populateScenicScores('left'));
  columns.forEach(populateScenicScores('down'));
  columnsReversed.forEach(populateScenicScores('up'));

  return Math.max(...grid.cells.map(cell => cell.scenicScore));
};
