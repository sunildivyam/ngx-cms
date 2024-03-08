import { EditorElement } from "./content-editor.interface";

export interface TableRow {
  id: string;
  data: Array<TableCell>;
}

export interface TableCell {
  id: string;
  data: EditorElement;
}
