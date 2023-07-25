import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { Article } from '@annuadvent/ngx-cms/article';

@Component({
  selector: 'anu-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent implements OnInit {
  @Input() value: Article | null = null;
  @Input() showMetaInfo: boolean = false;
  @Input() showAside: boolean = false;
  @Input() leftAsideClasses: Array<string> = ['col-sm-12', 'col-md-6', 'col-9'];
  @Input() rightAsideClasses: Array<string> = ['col-sm-12', 'col-md-6', 'col-3'];

  constructor(public utilsSvc: UtilsService) { }

  ngOnInit(): void {
  }

}
