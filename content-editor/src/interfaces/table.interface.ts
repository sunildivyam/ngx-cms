export interface TableInfo {
  classNames?: Array<string>;
  width?: string;
  height?: string;
  cellSpacing?: string;
  cellPadding?: string;
  thRow?: TableRow;
  rows?: Array<TableRow>;
}

export interface TableRow {
  classNames?: Array<string>;
  cells?: Array<TableCell>;
}

export interface TableCell {
  classNames?: Array<string>;
  width?: string;
  height?: string;
  value?: string;
}
