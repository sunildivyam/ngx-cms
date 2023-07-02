import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'anu-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnChanges {
  /**
   * Trims the description to the given character count and adds ... to the end of the text.
   */
  @Input() value: Category | null;
  /**
   * shows hyperlink to update page
   */
  @Input() updateHref: Array<string> = [];
  /**
   * shows hyperlink to readmore page
   */
  @Input() readMoreHref: Array<string> = [];
  /**
   * shows hyperlink to article full view page
   */
  @Input() titleHref: Array<string> = [];
  /**
   * if false, info like updated, created, published etc. will be hidden.
   */
  @Input() showMetaInfo: boolean = true;
  /**
   * toggle show short title on the card.
   */
  @Input() showShortTitle: boolean = true;
  /**
   * Trims the description to the given character count and adds ... to the end of the text.
   */
  @Input() descriptionCharCount: number = 0;

  /**
   * Shows/hides description from the card.
   */
  @Input() showDescription: boolean = true;

  trimmedDescription: string = '';

  constructor(public utilsSvc: UtilsService) { }

  ngOnInit(): void {
    this.trimDescription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.trimDescription();
  }

  private trimDescription() {
    const desc = this.value?.metaInfo?.description;

    if (this.descriptionCharCount && this.descriptionCharCount > 0) {
      this.trimmedDescription = this.utilsSvc.getTrimmedStringByChars(desc, this.descriptionCharCount);
    } else {
      this.trimmedDescription = desc;
    }
  }
}
