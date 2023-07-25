import { Directive, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective {
  @Input() focus: boolean;
  @Output() onFocus = new EventEmitter();

  constructor(@Inject(ElementRef) private element: ElementRef) { }

  protected ngOnChanges() {
    if (this.focus === true ) this.element.nativeElement.focus();    
  }
}
