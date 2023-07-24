import { Component, Input } from '@angular/core';
import { Category } from '@annuadvent/ngx-cms/category';
import { Article } from '@annuadvent/ngx-cms/article';

@Component({
  selector: 'anu-category-articles-list',
  templateUrl: './category-articles-list.component.html',
  styleUrls: ['./category-articles-list.component.scss']
})
export class CategoryArticlesListComponent {
  @Input() category: Category | null | undefined;
  @Input() articles: Array<Article> = [];
  @Input() headerClassNames: Array<string> = [];
  @Input() listClassNames: Array<string> = [];
  @Input() categoryHref: string = '';
  @Input() articleHref: string = '';
  @Input() readMoreLabel: string = '';

  noDataMessage: string = 'No data Available';

  constructor() { }
}
