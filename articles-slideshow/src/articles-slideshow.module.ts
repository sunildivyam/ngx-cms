import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesSlideshowComponent } from './components/articles-slideshow/articles-slideshow.component';
import { SlideshowModule } from '@annuadvent/ngx-common-ui/slideshow';
import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ArticlesSlideshowComponent],
  imports: [CommonModule, RouterModule, SlideshowModule, CardModule],
  exports: [ArticlesSlideshowComponent],
})
export class ArticlesSlideshowModule { }
