import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { MetaModule } from '@annuadvent/ngx-common-ui/meta';
import { CodeBlockModule } from '@annuadvent/ngx-common-ui/code-block';
import { ArticleComponent } from './components/article/article.component';
import { ArticleElementComponent } from './components/article-element/article-element.component';




@NgModule({
  declarations: [
    ArticleComponent,
    ArticleElementComponent,
  ],
  imports: [
    CommonModule,
    MetaModule,
    CardModule,
    RouterModule,
    CodeBlockModule,
  ],
  exports: [ArticleComponent, ArticleElementComponent],
})
export class ArticleModule { }
