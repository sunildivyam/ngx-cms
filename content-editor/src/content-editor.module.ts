import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '@annuadvent/ngx-common-ui/toolbar';
import { ModalModule } from '@annuadvent/ngx-common-ui/modal';
import { CmsImageFormModule } from '@annuadvent/ngx-cms/cms-image-form';
import { LinkFormModule } from '@annuadvent/ngx-common-ui/link-form';
import { CodeBlockModule } from '@annuadvent/ngx-common-ui/code-block';
import { ContenteditableValueAccessorDirective } from './directives/contenteditable-value-accessor.directive';
import { FocusDirective } from './directives/focus.directive';
import { FormatInlineDirective } from './directives/format-inline.directive';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { ContentElementComponent } from './components/content-element/content-element.component';
import { LeafElementComponent } from './components/leaf-element/leaf-element.component';
import { TableComponent } from './components/table/table.component';
import { TableFormComponent } from './components/table-form/table-form.component';
import { ElementStylesModule } from '@annuadvent/ngx-common-ui/element-styles';

@NgModule({
  declarations: [
    ContentEditorComponent,
    ContenteditableValueAccessorDirective,
    FocusDirective,
    ContentElementComponent,
    FormatInlineDirective,
    LeafElementComponent,
    TableComponent,
    TableFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    ModalModule,
    CmsImageFormModule,
    LinkFormModule,
    CodeBlockModule,
    ElementStylesModule,
  ],
  exports: [
    ContentEditorComponent,
    ContenteditableValueAccessorDirective,
    FocusDirective,
    ContentElementComponent,
    FormatInlineDirective,
    LeafElementComponent,
    TableComponent,
    TableFormComponent,
  ],
})
export class ContentEditorModule {}
