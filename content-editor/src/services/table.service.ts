import { Inject, Injectable } from '@angular/core';
import { TableCell, TableInfo, TableRow } from '../interfaces/table.interface';
import { SAMPLE_TABLE } from '../constants/table.constants';
import { DOCUMENT } from '@angular/common';

/**
 * TableService service provides methods and functionality for tabular content creation.
 * 1) Creates a table.
 * 2) Updates a table.
 * 3) Table can be used in content editor.
 */
@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   *  Creates specified number of Empty initialized Table cells
   * @param count number of cells
   * @returns Empty initialized Table Cells
   */
  private getCells(count): Array<TableCell> {
    const cells: Array<TableCell> = [];
    for (let i = 0; i < count; i++) {
      cells.push({
        classNames: [],
        width: 'auto',
        height: 'auto',
        value: '',
      } as TableCell);
    }

    return cells;
  }

  /**
   * Gets a Table row with initialized cells
   * 1) Merges existing cells
   * 2) removes extra cells, if needed
   * 3) adds empty initialized additional cells, if needed
   * @param row TableRow, if null, creates a new row self initialized cells
   * @param cellCount Number of cells in the row
   * @returns TableRow
   */
  private getRowWithCells(row: TableRow, cellCount: number): TableRow {
    const newRow: TableRow = row
      ? { ...row }
      : ({
          classNames: [],
          cells: [],
        } as TableRow);

    const cells: Array<TableCell> = [];
    const isAdditionalCells: boolean = cellCount > newRow.cells.length;

    const additionalCells = isAdditionalCells
      ? this.getCells(cellCount - newRow.cells.length)
      : [];

    newRow.cells.splice(
      cellCount,
      isAdditionalCells ? 0 : newRow.cells.length - cellCount,
      ...additionalCells
    );

    return newRow;
  }

  /**
   * Returns a new Table having provided number of rows and columns, and with sample data in cells.
   * @param rowCount Number of rows for the table
   * @param columnCount Number of columns for the table
   * @param tableInfo TableInfo - existing table, if updates needed. Provide null if new table is needed.
   * @returns Updated TableInfo (Table structure)
   */
  public getTable(
    rowCount: number = 2,
    columnCount: number = 2,
    tableInfo: TableInfo = null
  ): TableInfo {
    tableInfo = tableInfo || SAMPLE_TABLE;

    // Update or create Table Header Row
    tableInfo.thRow = this.getRowWithCells(tableInfo.thRow, columnCount);

    // Update or create Table Rows
    const rows: Array<TableRow> = [];
    for (let r = 0; r < rowCount; r++) {
      const newRow = this.getRowWithCells(
        tableInfo.rows[r] || null,
        columnCount
      );

      rows.push(newRow);
    }

    tableInfo.rows = rows;
    return tableInfo;
  }

  public getTableInfoFromMarkup(tableMarkUp: string): TableInfo {
    if (!tableMarkUp) return null;

    const tableInfo: TableInfo = {};

    const rootEl = this.document.createElement('div');
    rootEl.innerHTML = tableMarkUp;
    const table = rootEl.querySelector('table');

    if (!table) return null;

    const tHs = table.querySelectorAll('tr > th');
    const tRs = table.querySelectorAll('tr:not(:has(th))');

    const thRow: TableRow = { cells: [] };
    const rows: Array<TableRow> = [];

    tHs?.forEach((th: Element) => {
      thRow.cells.push({
        value: th.innerHTML,
      } as TableCell);
    });

    tRs?.forEach((tr: Element) => {
      const tDs = tr.querySelectorAll('td');
      const cells: Array<TableCell> = [];

      tDs?.forEach((td: Element) => {
        cells.push({
          value: td.innerHTML,
        });
      });
      rows.push({
        cells: cells,
      });
    });

    tableInfo.thRow = thRow;
    tableInfo.rows = rows;

    return tableInfo;
  }
}
