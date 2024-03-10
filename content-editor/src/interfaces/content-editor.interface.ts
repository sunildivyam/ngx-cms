import { TableInfo } from './table.interface';

export interface EditorElementData {
  src?: string; // Image src
  alt?: string; // Image alt
  text?: string; // html/text content
  source?: string; // Code block
  language?: string; // Code block
  enableEdit?: string; // Code block
  tableData?: TableInfo; // Table Data
}

export interface EditorElement {
  name: string;
  tagName: string;
  isContainer?: boolean;
  focused?: boolean;
  data?: EditorElementData;
  children?: Array<EditorElement>;
}

export interface Rectangle {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width?: number;
  height?: number;
}
