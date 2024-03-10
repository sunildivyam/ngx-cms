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

  constructor(
    private utilsService: UtilsService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.tableInfo = this.utilsService.deepCopy(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tableInfo = this.utilsService.deepCopy(this.value);
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
}
