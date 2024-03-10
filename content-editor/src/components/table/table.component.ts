import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableInfo } from '../../interfaces/table.interface';
import { TableCellValueTypeEnums } from '../../enums/table.enums';
import { EditorElement } from '../../interfaces/content-editor.interface';
import { ToolbarItem } from '@annuadvent/ngx-common-ui/toolbar';
import { TABLE_TOOLBAR_ITEMS } from '../../constants/table.constants';

@Component({
  selector: 'anu-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() value: TableInfo;
  @Input() enableEdit: boolean = false;

  @Output() changed = new EventEmitter<TableInfo>();
  @Output() tableModalOpenStatusChanged = new EventEmitter<boolean>();

  cellValueTypes = TableCellValueTypeEnums;
  toolbarItems: Array<ToolbarItem> = [...TABLE_TOOLBAR_ITEMS];
  showTableForm: boolean = false;
  rowCount: number = 2;
  columnCount: number = 2;

  tableInfo: TableInfo = {
    classNames: [],
    width: '600px',
    height: '400px',
    cellSpacing: '0px',
    cellPadding: '0px',
  };

  constructor() {}

  ngOnInit(): void {
    console.log('Table', this.value);
  }

  public cellValueChanged(cellValue: EditorElement): void {
    console.log(cellValue);
    this.changed.emit(this.value);
  }

  public toolbarChanged(selectedItem: ToolbarItem): void {
    this.showTableForm = true;
    this.tableModalOpenStatusChanged.emit(true);
  }

  public modalOkClicked(modalOpened: boolean): void {
    this.showTableForm = modalOpened;
    this.value = this.tableInfo;
    this.changed.emit(this.value);
    this.tableModalOpenStatusChanged.emit(modalOpened);
  }

  public modalCancelClicked(modalOpened: boolean): void {
    this.showTableForm = modalOpened;
    this.tableModalOpenStatusChanged.emit(modalOpened);
  }
}
