import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ToolbarItem } from '@annuadvent/ngx-common-ui/toolbar';
import { EditorElement } from '../../interfaces/content-editor.interface';
import { ImageInfo } from '@annuadvent/ngx-cms/cms-image-form';
import { ContentEditorService } from '../../services/content-editor.service';
import { TOOLBAR_STYLES } from '../../constants/content-editor.constants';
import { SAMPLE_TABLE } from '../../constants/table.constants';

@Component({
  selector: 'anu-content-element',
  templateUrl: './content-element.component.html',
  styleUrls: ['./content-element.component.scss'],
})
export class ContentElementComponent
  implements OnInit, AfterContentChecked, OnChanges
{
  @Input() editorElement: EditorElement = {} as EditorElement;
  @Input() fullTree: EditorElement = {} as EditorElement;
  @Input() enableOpenai: boolean = false;
  @Output() changed = new EventEmitter<EditorElement>();

  isToolbar: boolean = false;
  styleToolbar: Array<ToolbarItem> = TOOLBAR_STYLES;
  toggleImageForm: boolean = false;
  imageInfo: ImageInfo = {
    src: 'https://',
    alt: '',
  };

  showMarkupModal: boolean = false;
  markModalText: string = '';

  // Styles Modal
  showStylesModal: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private ceService: ContentEditorService
  ) {}

  ngOnInit(): void {
    this.setStyleToolbarItems();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setStyleToolbarItems();
  }

  private setStyleToolbarItems() {
    if (this.editorElement?.tagName === 'li') {
      // this.styleToolbar = this.styleToolbar.filter(item => ['ul', 'ol'].includes(item.name)) // disable non list elements
    }
  }

  public enterKeyPressed(el: EditorElement) {
    this.ceService.addNewEditorElement(el, this.fullTree);
  }

  public backspaceKeyPressed(el: EditorElement) {
    this.ceService.removeEditorElement(el, this.fullTree);
    this.cdr.detectChanges();
  }

  public focusin() {
    if (!this.editorElement?.isContainer) {
      this.ceService.setFocusOffAll(this.fullTree);
      this.editorElement.focused = true;
      this.isToolbar = false;
    }
  }

  public onBlur() {
    this.changed.emit(this.editorElement);
  }

  public toggleToolbar(event, editorElement) {
    event.preventDefault();
    this.isToolbar = !this.isToolbar;
  }

  public styleToolbarSelected(item: ToolbarItem) {
    switch (item.name) {
      case 'img':
        this.toggleImageForm = true;
        this.imageInfo.alt =
          this.editorElement?.data?.alt || this.editorElement?.data?.text;
        if (this.editorElement?.data?.src) {
          this.imageInfo.src = this.editorElement?.data?.src;
        }
        break;

      case 'anu-code-block':
        this.ceService.replaceElement(
          this.editorElement,
          item.name,
          this.fullTree,
          { source: '<h1>Sample source code</h1>', language: 'markup' }
        );
        this.isToolbar = !this.isToolbar;
        break;

      case 'anu-table':
        this.ceService.replaceElement(
          this.editorElement,
          item.name,
          this.fullTree,
          {
            tableData: SAMPLE_TABLE,
          }
        );
        this.isToolbar = !this.isToolbar;
        break;

      case 'markup':
        if (
          ['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(
            this.editorElement?.tagName
          )
        ) {
          this.markModalText = this.editorElement?.data?.text || '';
          this.showMarkupModal = true;
        }

        break;
      case 'element-styles':
        if (
          ['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'].includes(
            this.editorElement?.tagName
          )
        ) {
          this.isToolbar = !this.isToolbar;
          this.showStylesModal = true;
        }

        break;

      default:
        this.ceService.replaceElement(
          this.editorElement,
          item.name,
          this.fullTree
        );
        this.isToolbar = !this.isToolbar;
    }
  }

  public cancelImageModal() {
    this.toggleImageForm = false;
  }

  public saveImage(image: ImageInfo) {
    this.ceService.replaceElement(
      this.editorElement,
      'img',
      this.fullTree,
      image
    );
    this.toggleImageForm = false;
    this.isToolbar = !this.isToolbar;
  }

  public markupModalOk(): void {
    this.showMarkupModal = false;
    this.editorElement.data = this.editorElement.data || {};
    this.editorElement.data.text = this.markModalText;
  }

  public elementStylesChanged(classNames: Array<string>): void {
    this.editorElement.classNames = [...classNames];
    this.changed.emit(this.editorElement);
  }
}
