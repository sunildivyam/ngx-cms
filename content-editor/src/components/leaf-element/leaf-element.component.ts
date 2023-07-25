import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CodeBlockInfo } from '@annuadvent/ngx-common-ui/code-block';
import { SUPPORTED_TAGS } from '../../constants/content-editor.constants';
import { EditorElement, EditorElementData } from '../../interfaces/content-editor.interface';

@Component({
  selector: 'anu-leaf-element',
  templateUrl: './leaf-element.component.html',
  styleUrls: ['./leaf-element.component.scss']
})
export class LeafElementComponent implements OnInit {
  @Input() value: EditorElement = {} as EditorElement;
  @Input() fullTree: EditorElement = {} as EditorElement;
  @Output() enterKeyPressed = new EventEmitter<EditorElement>();
  @Output() backspaceKeyPressed = new EventEmitter<EditorElement>();
  @Output() changed = new EventEmitter<EditorElement>();
  @Output() focusin = new EventEmitter<EditorElement>();

  /**
   * checks if CodeBlock modal is open, then prevent from reciving keydown.enter and keydown.backspace events.
  */
  sourceModalOpenStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public enterPressed(event: any, value: EditorElement): void {
    //checks if CodeBlock modal is open, then prevent from reciving keydown.enter and keydown.backspace events
    if (!this.sourceModalOpenStatus) {
      event.preventDefault();
      this.enterKeyPressed.emit(value);
    }
  }

  public backspacePressed(event: any): void {
    if ((!this.value?.data?.text || this.value?.tagName === SUPPORTED_TAGS.CODE_BLOCK) && !this.sourceModalOpenStatus) {
      event.preventDefault();
      this.backspaceKeyPressed.emit(this.value);
    }
  }

  public onBlur(event: any) {
    event.stopPropagation();
    this.changed.emit(this.value);
  }

  public onFocus(event: any) {
    event.stopPropagation();
    this.focusin.emit(this.value);
  }

  public textSelected() {
    // TODO
  }

  public codeBlockChanged(codeBlockInfo: CodeBlockInfo) {
    this.value.data = { source: codeBlockInfo.source, language: codeBlockInfo.language } as EditorElementData
    this.changed.emit(this.value);
  }

  /**
   * checks if CodeBlock modal is open, then prevent from reciving keydown.enter and keydown.backspace events.
  */
  public sourceModalOpenStatusChanged(opened: boolean) {
    this.sourceModalOpenStatus = opened;
  }
}
