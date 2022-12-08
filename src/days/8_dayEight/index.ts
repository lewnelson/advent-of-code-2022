// https://adventofcode.com/2022/day/8
import { Main } from '~/types';

interface CellProps {
  row: number;
  column: number;
  value: number;
}

class Cell {
  public row: number;
  public column: number;
  public value: number;

  constructor({ row, column, value }: CellProps) {
    this.row = row;
    this.column = column;
    this.value = value;
  }

  toString() {
    return `x: ${this.column}; y: ${this.row}; value: ${this.value}`;
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

export const partOne: Main = input => {
  const grid = new Grid(parseGrid(input));
  const { rows, columns, rowsReversed, columnsReversed } = grid;
  const visibleCells = [...rows, ...columns, ...rowsReversed, ...columnsReversed].reduce((visibleCells, cells) => {
    return [...visibleCells, ...getVisibleCells(cells)];
  }, []);

  const uniqueVisibleCells = new Set(visibleCells.map(cell => cell.toString()));
  return uniqueVisibleCells.size;
};
