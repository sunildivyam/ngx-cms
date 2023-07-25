import { DOCUMENT } from '@angular/common';
import { Directive, EventEmitter, HostListener, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { SelectionService } from '../services/selection.service';

@Directive({
  selector: '[anuFormatInline]',
  outputs: ['selected: anuFormatInline']
})
export class FormatInlineDirective implements OnInit, OnDestroy {
  selected = new EventEmitter();

  constructor(private selService: SelectionService, private zone: NgZone, @Inject(DOCUMENT) private document: Document) {
    this.handleDocumentSelectionChange = this.handleDocumentSelectionChange.bind(this);
  }

  public ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.document.addEventListener('selectionchange', this.handleDocumentSelectionChange, false);
    })
  }

  public ngOnDestroy(): void {
    this.document.removeEventListener('selectionchange', this.handleDocumentSelectionChange, false);
  }

  public setSelection(selection: Selection) {
    this.selService.saveSelection(selection);
    this.selected.emit();
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: any) {
    this.setSelection(event.view.getSelection());
  }

  private handleDocumentSelectionChange(event: any) {
    if (!event.target.getSelection().toString()) {
      // this.selected.emit();
    }
  }
}
