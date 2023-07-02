import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Article } from '@annuadvent/ngx-cms/article';
import { UtilsService } from '@annuadvent/ngx-core/utils';

@Component({
  selector: 'anu-articles-slideshow',
  templateUrl: './articles-slideshow.component.html',
  styleUrls: ['./articles-slideshow.component.scss'],
})
export class ArticlesSlideshowComponent implements OnInit, OnChanges {
  @Input() articles: Array<Article> = [];
  @Input() isRowlayout: boolean = true;
  /**
   * sm, md or lg size names
   */
  @Input() size: string = 'sm';
  @Input() showDescription: boolean = false;
  @Input() descriptionCharCount: number = 0;

  cardImageClasses: Array<string> = [];
  cardContentClasses: Array<string> = [];

  constructor(private utilsSvc: UtilsService) {
    this.setCardClasses();
  }
  ngOnInit(): void {
    this.setCardClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setCardClasses();
  }

  private setCardClasses(): void {
    if (this.isRowlayout) {
      this.cardImageClasses = ['col-sm-4', 'col-md-4', 'col-lg-4'];
      this.cardContentClasses = ['col-sm-8', 'col-md-8', 'col-lg-8'];
    } else {
      this.cardImageClasses = [];
      this.cardContentClasses = [];
    }
  }

  public trimDescription(description: string): string {
    return this.utilsSvc.getTrimmedStringByChars(
      description,
      this.descriptionCharCount
    );
  }
}
