import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TableInfo } from '../../interfaces/table.interface';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { TableService } from '../../services/table.service';

/**
 * TableFormComponent is a table editor component
 * 1) Updates table meta, style information.
 * 2) Add/update/remove rows/columns
 * 3) Add/update/remove CSS classes from table/rows/cells
 */
@Component({
  selector: 'anu-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss'],
})
export class TableFormComponent implements OnInit, OnChanges {
  @Input() value: TableInfo;

  @Output() changed = new EventEmitter<TableInfo>();

  rowCount: number = 2;
  columnCount: number = 2;
  tableInfo: TableInfo;

  // Load Table from markup variables
  tableMarkup: string = '';
  markUpError: string = '';

  constructor(
    private utilsService: UtilsService,
    private tableService: TableService
  ) {}

  private initForm(): void {
    this.tableInfo = this.utilsService.deepCopy(this.value);
    this.rowCount = this.tableInfo?.rows?.length || 2;
    this.columnCount = this.tableInfo?.thRow?.cells?.length || 2;
  }
  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

  public onChange(): void {
    // Create Table based on table info
    setTimeout(() => {
      this.tableInfo = this.tableService.getTable(
        this.rowCount,
        this.columnCount,
        this.tableInfo
      );

      this.changed.emit(this.utilsService.deepCopy(this.tableInfo));
    });
  }

  public onPreview(): void {
    this.markUpError = '';

    const tableInfo = this.tableService.getTableInfoFromMarkup(
      this.tableMarkup
    );
    if (tableInfo) {
      this.tableInfo = this.utilsService.deepCopy(tableInfo);
      this.changed.emit(this.utilsService.deepCopy(this.tableInfo));
    } else {
      this.markUpError = 'No valid table in the markup';
    }
  }
}
