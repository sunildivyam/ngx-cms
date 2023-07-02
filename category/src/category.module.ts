import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
  ],
  exports: [
    CategoryComponent
  ],
})
export class CategoryModule { }
