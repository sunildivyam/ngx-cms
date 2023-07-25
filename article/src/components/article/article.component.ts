import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Article } from '../../interfaces//article.interface';
import { UtilsService } from '@annuadvent/ngx-core/utils';

@Component({
  selector: 'anu-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnChanges {
  /**
   * Trims the description to the given character count and adds ... to the end of the text.
   */
  @Input() value: Article | null;
  /**
   * shows hyperlink to update page
   */
  @Input() updateHref: Array<string> = [];
  /**
   * shows hyperlink to readmore page
   */
  @Input() readMoreHref: Array<string> = [];

  /**
   * readmore label
   */
  @Input() readMoreLabel: string = '';

  /**
   * shows hyperlink to article full view page
   */
  @Input() titleHref: Array<string> = [];
  /**
   * if false, info like updated, created, published etc. will be hidden.
   */
  @Input() showMetaInfo: boolean = true;
  /**
   * Trims the description to the given character count and adds ... to the end of the text.
   */
  @Input() descriptionCharCount: number = 0;

  /**
   * Shows/hides description from the card.
   */
  @Input() showDescription: boolean = true;

  /**
   * Shows/hides image on the card.
   */
  @Input() showImage: boolean = true;

  /**
   * Shows/hides image on the card.
   */
  @Input() isRowLayout: boolean = true;

  trimmedDescription: string = '';
  imageClassNames: Array<string> = [];
  contentClassNames: Array<string> = [];
  cardClassNames: Array<string> = [];

  constructor(public utilsSvc: UtilsService) { }

  ngOnInit(): void {
    this.trimDescription();
    this.setClassNames();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.trimDescription();
    this.setClassNames();
  }

  private setClassNames(): void {
    if (this.isRowLayout) {
      this.imageClassNames = this.showImage
        ? ['col-sm-12', 'col-md-4', 'col-lg-4']
        : ['hidden'];
      this.contentClassNames = this.showImage
        ? ['col-sm-12', 'col-md-8', 'col-lg-8']
        : ['col-12'];
      this.cardClassNames = ['nowrap-md', 'nowrap-lg'];
    } else {
      this.imageClassNames = this.showImage ? ['col-12'] : ['hidden'];
      this.contentClassNames = ['col-12'];
      this.cardClassNames = [];
    }
  }

  private trimDescription() {
    this.trimmedDescription = this.utilsSvc.getTrimmedStringByChars(
      this.value?.metaInfo?.description,
      this.descriptionCharCount
    );
  }
}
