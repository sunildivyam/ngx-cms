import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from '@annuadvent/ngx-common-ui/tabs';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { CmsImageFormModule } from '@annuadvent/ngx-cms/cms-image-form';
import { ModalModule } from '@annuadvent/ngx-common-ui/modal';
import { MetaModule } from '@annuadvent/ngx-common-ui/meta';
import { MultiSelectBoxModule } from '@annuadvent/ngx-common-ui/multi-select-box';
import { ToggleModule } from '@annuadvent/ngx-common-ui/toggle';
import { ContentEditorModule } from '@annuadvent/ngx-cms/content-editor';
import { ArticleModule } from '@annuadvent/ngx-cms/article';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { OpenaiModule } from '@annuadvent/ngx-tools/openai';
import { FireAuthModule } from '@annuadvent/ngx-tools/fire-auth';


@NgModule({
  declarations: [ArticleEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    ContentEditorModule,
    CardModule,
    CmsImageFormModule,
    ModalModule,
    MetaModule,
    ArticleModule,
    MultiSelectBoxModule,
    ToggleModule,
    OpenaiModule,
    FireAuthModule,
  ],
  exports: [ArticleEditorComponent],
})
export class ArticleEditorModule { }
