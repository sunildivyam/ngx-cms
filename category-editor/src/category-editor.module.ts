import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryEditorComponent } from './components/category-editor/category-editor.component';
import { ContentEditorModule } from '@annuadvent/ngx-cms/content-editor';

import { TabsModule } from '@annuadvent/ngx-common-ui/tabs';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { ImageFormModule } from '@annuadvent/ngx-common-ui/image-form';
import { ModalModule } from '@annuadvent/ngx-common-ui/modal';
import { MetaModule } from '@annuadvent/ngx-common-ui/meta';
import { MultiSelectBoxModule } from '@annuadvent/ngx-common-ui/multi-select-box';
import { ToggleModule } from '@annuadvent/ngx-common-ui/toggle';

import { CategoryModule } from '@annuadvent/ngx-cms/category';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CategoryEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    ContentEditorModule,
    CardModule,
    ImageFormModule,
    ModalModule,
    MetaModule,
    MultiSelectBoxModule,
    ToggleModule,
    CategoryModule,
  ],
  exports: [
    CategoryEditorComponent
  ],
})
export class CategoryEditorModule { }
