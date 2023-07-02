import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditorElement, Rectangle } from '../../interfaces/content-editor.interface';
import { EDITOR_ROOT_ELEMENT, TOOLBAR_FORMATTING } from '../../constants/content-editor.constants';
import { ToolbarItem } from '@annuadvent/ngx-common-ui/toolbar';
import { Link } from '@annuadvent/ngx-common-ui/link-form';
import { ImageInfo } from '@annuadvent/ngx-common-ui/image-form';
import { SelectionService } from '../../services/selection.service';

@Component({
  selector: 'anu-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit {
  @Input() value: EditorElement = { ...EDITOR_ROOT_ELEMENT };
  @Input() enableOpenai: boolean = false;
  @ViewChild('popup', { static: true }) popupEl: ElementRef;
  @Output() changed = new EventEmitter<EditorElement>();

  selectionRect: Rectangle;
  isTextSelected: boolean = false;
  formattingToolbar: Array<ToolbarItem> = TOOLBAR_FORMATTING;

  link: Link = {
    href: 'https://',
    label: '',
    title: '',
    target: '_blank'
  };

  imageInfo: ImageInfo = {
    src: '',
    alt: '',
  };

  toggleLinkForm: boolean = false;
  toggleImageForm: boolean = false;

  constructor(private selService: SelectionService) {
    this.selectionRect = { top: 0, left: 0, bottom: 0, right: 0 }
    this.selService.selection.subscribe(this.handleTextSelection);
  }


  handleTextSelection = (hasSelection: boolean) => {
    this.isTextSelected = hasSelection;
    if (hasSelection) {
      setTimeout(() => {
        this.selectionRect = this.selService.getSelectionRect();
        if (this.selectionRect) {
          this.selectionRect.top = this.selectionRect.top - this.popupEl.nativeElement.offsetHeight - this.selectionRect.height;
        }
      })
    }
  }

  ngOnInit(): void {
  }


  public contentChanged(el: EditorElement) {
    this.changed.emit(this.value);
  }

  public saveLink(link: Link): void {
    this.selService.addLink(link);
    this.toggleLinkForm = false;
    this.isTextSelected = false;
  }

  public saveImage(image: ImageInfo): void {
    this.selService.addImage(image);
    this.toggleImageForm = false;
    this.isTextSelected = false;
  }

  public cancelLinkModal(): void {
    this.toggleLinkForm = false;
  }

  public cancelImageModal(): void {
    this.toggleImageForm = false;
  }

  public formattingToolbarSelected(toolbarItem: ToolbarItem): void {
    switch (toolbarItem.name) {
      case 'link':
        this.link = {
          href: 'https://',
          label: this.selService.selectionText,
          title: this.selService.selectionText,
          target: '_blank'
        };
        this.toggleLinkForm = !this.toggleLinkForm;
        break;
      case 'image':
        this.imageInfo = {
          src: 'https://',
          alt: this.selService.selectionText,
        };
        this.toggleImageForm = !this.toggleImageForm;
        break;
      case 'bold':
        this.selService.addFormating('b');
        this.isTextSelected = false;
        break;
      case 'italic':
        this.selService.addFormating('i');
        this.isTextSelected = false;
        break;
      case 'underline':
        this.selService.addFormating('u');
        this.isTextSelected = false;
        break;
      default:
        this.isTextSelected = false;
        break;
    }
  }
}
