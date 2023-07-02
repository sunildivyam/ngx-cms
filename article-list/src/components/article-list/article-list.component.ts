import { Component, Input, OnInit } from '@angular/core';
import { Article } from '@annuadvent/ngx-cms/article';

@Component({
  selector: 'anu-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  @Input() items: Array<Article> = [];
  @Input() href: string;

  constructor() { }

  ngOnInit(): void {
  }

}
