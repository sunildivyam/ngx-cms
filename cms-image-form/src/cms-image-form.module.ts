import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CmsImageFormComponent } from './components/cms-image-form/cms-image-form.component';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { CollapsibleModule } from '@annuadvent/ngx-common-ui/collapsible';
import { UtilsModule } from '@annuadvent/ngx-core/utils';
import { FireStorageModule } from '@annuadvent/ngx-tools/fire-storage';
import { OpenaiModule } from '@annuadvent/ngx-tools/openai';



@NgModule({
  declarations: [CmsImageFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ErrorModule,
    CollapsibleModule,
    UtilsModule,
    FireStorageModule,
    OpenaiModule,
  ],
  exports: [CmsImageFormComponent],
})
export class CmsImageFormModule { }
