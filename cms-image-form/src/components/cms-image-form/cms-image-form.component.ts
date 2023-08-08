import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageInfo } from '../../interfaces/cms-image-form.interface';
import { ImageBrowserService, ImageFileInfo } from '@annuadvent/ngx-tools/fire-storage';
import { OpenaiService } from '@annuadvent/ngx-tools/openai';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';

@Component({
  selector: 'anu-cms-image-form',
  templateUrl: './cms-image-form.component.html',
  styleUrls: ['./cms-image-form.component.scss']
})
export class CmsImageFormComponent implements OnInit {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() enableOpenai: boolean = false;
  @Input() enableImageBrowser: boolean = true;

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<ImageInfo>();

  constructor(
    private imageBrowserService: ImageBrowserService,
    private openaiService: OpenaiService,
    private appConfigService: AppConfigService,
  ) { 
    this.imageBrowserService.selected.subscribe((imageFile: ImageFileInfo) => {
      this.src = imageFile && `getImage?imageId=${imageFile.fullPath}` || '';
    })
  }

  ngOnInit(): void {
    this.openaiService.initOpenai(this.appConfigService.openai);
  }

  public cancelClicked(event: any) {
    event.preventDefault();
    this.cancel.emit();
  }

  public saveClicked(event: any) {
    event.preventDefault();
    this.save.emit({ src: this.src, alt: this.alt } as ImageInfo);
  }

  public openaiFileUploaded(imageFile: any): void {
    this.src = imageFile && `getImage?imageId=${imageFile.fullPath}` || '';
  }  
}
