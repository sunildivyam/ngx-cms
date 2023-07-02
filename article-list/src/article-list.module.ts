import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleModule } from '@annuadvent/ngx-cms/article';
import { ArticleListComponent } from './components/article-list/article-list.component';


@NgModule({
  declarations: [
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    ArticleModule,
    RouterModule,
  ],
  exports: [
    ArticleListComponent
  ],
})
export class ArticleListModule { }
