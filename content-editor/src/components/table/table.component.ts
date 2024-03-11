import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableCell, TableInfo } from '../../interfaces/table.interface';
import { ToolbarItem } from '@annuadvent/ngx-common-ui/toolbar';
import { TABLE_TOOLBAR_ITEMS } from '../../constants/table.constants';
import { TableService } from '../../services/table.service';
import { UtilsService } from '@annuadvent/ngx-core/utils';

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

  toolbarItems: Array<ToolbarItem> = [...TABLE_TOOLBAR_ITEMS];
  showTableForm: boolean = false;
  rowCount: number = 2;
  columnCount: number = 2;

  tableInfo: TableInfo = null;
  activeCell: TableCell = null;
  showStylesModal: boolean = false;

  // Styles Toolbar
  // showStylesToolbar: boolean = false;

  constructor(
    private tableService: TableService,
    private utilsService: UtilsService
  ) {
    this.value = this.tableService.getTable(2, 2);
  }

  ngOnInit(): void {}

  public toolbarChanged(selectedItem: ToolbarItem): void {
    this.tableInfo = this.utilsService.deepCopy(this.value);
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

  public tableChanged(tInfo: TableInfo): void {
    this.tableInfo = tInfo;
  }

  public textSelected() {
    // TODO
  }

  public enterPressed(event: any): void {
    event.stopPropagation();
  }

  public backspacePressed(event: any): void {
    event.stopPropagation();
  }

  public onBlur(event: any) {
    event.stopPropagation();
    this.changed.emit(this.value);
  }

  public elementStylesChanged(selectedClassNames: Array<string>): void {
    this.activeCell.classNames = selectedClassNames;
    this.changed.emit(this.value);
  }

  public onStylesToolbarClick(item: ToolbarItem): void {
    this.showStylesModal = true;
  }
}
