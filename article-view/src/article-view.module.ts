import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleModule } from '@annuadvent/ngx-cms/article';
import { ArticleViewComponent } from './components/article-view/article-view.component';




@NgModule({
  declarations: [
    ArticleViewComponent
  ],
  imports: [
    CommonModule,
    ArticleModule,
  ],
  exports: [
    ArticleViewComponent
  ],
})
export class ArticleViewModule { }
