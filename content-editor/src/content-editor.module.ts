import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from '@annuadvent/ngx-common-ui/toolbar';
import { ModalModule } from '@annuadvent/ngx-common-ui/modal';
import { ImageFormModule } from '@annuadvent/ngx-common-ui/image-form';
import { LinkFormModule } from '@annuadvent/ngx-common-ui/link-form';
import { CodeBlockModule } from '@annuadvent/ngx-common-ui/code-block';
import { ContenteditableValueAccessorDirective } from './directives/contenteditable-value-accessor.directive';
import { FocusDirective } from './directives/focus.directive';
import { FormatInlineDirective } from './directives/format-inline.directive';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { ContentElementComponent } from './components/content-element/content-element.component';
import { LeafElementComponent } from './components/leaf-element/leaf-element.component';



@NgModule({
  declarations: [
    ContentEditorComponent,
    ContenteditableValueAccessorDirective,
    FocusDirective,
    ContentElementComponent,
    FormatInlineDirective,
    LeafElementComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    ModalModule,
    ImageFormModule,
    LinkFormModule,
    CodeBlockModule
  ],
  exports: [
    ContentEditorComponent,
    ContenteditableValueAccessorDirective,
    FocusDirective,
    ContentElementComponent,
    FormatInlineDirective,
    LeafElementComponent,
  ],
})
export class ContentEditorModule { }
