import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenaiAutoArticlesComponent } from './components/openai-auto-articles/openai-auto-articles.component';
import { OpenaiModule } from '@annuadvent/ngx-tools/openai';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { CollapsibleModule } from '@annuadvent/ngx-common-ui/collapsible';
import { ModalModule } from '@annuadvent/ngx-common-ui/modal';



@NgModule({
  declarations: [
    OpenaiAutoArticlesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OpenaiModule,
    SpinnerModule,
    CollapsibleModule,
    ModalModule,
  ],
  exports: [
    OpenaiAutoArticlesComponent
  ]
})
export class OpenaiAutoArticlesModule { }
