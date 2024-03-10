import { TableCellValueTypeEnums } from '../enums/table.enums';
import { EditorElement } from './content-editor.interface';

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
  valueType?: TableCellValueTypeEnums;
  richValue?: EditorElement; //if cell valueType  rich = EditorElement
  plainValue?: string; //if cell valueType  plain = string
}
