import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { Category, SAMPLE_CATEGORY, CategoryFeatures } from '@annuadvent/ngx-cms/category';
import { CATEGORY_EDITOR_TABS } from '../../constants/category-editor.constants';
import { ImageInfo } from '@annuadvent/ngx-common-ui/image-form';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { Tab } from '@annuadvent/ngx-common-ui/tabs';

@Component({
  selector: 'anu-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit, OnChanges {
  @Input() value: Category | null;
  @Input() imageHelpText: string = '';
  @Input() readonlyId: boolean = true;
  @Input() readonlyTitle: boolean = false;
  @Input() enableUniqueId: boolean = true;
  @Input() enablePublish: boolean = true;
  @Input() enableDelete: boolean = true;
  @Input() enableReadonlyIdToggle: boolean = true;

  @Output() changed = new EventEmitter<Category>();
  @Output() saveClicked = new EventEmitter<Category>();
  @Output() deleteClicked = new EventEmitter<Category>();
  @Output() inReviewClicked = new EventEmitter<Category>();
  @Output() isLiveClicked = new EventEmitter<Category>();

  toggleImageForm: boolean = false;
  tabs: Array<Tab> = CATEGORY_EDITOR_TABS.map(t => ({ ...t }));

  activeTab = this.tabs[0];
  category: Category;
  sampleCategory: Category;
  selectedCategoryFeatures: Array<any> = [];
  categoryFeatures: Array<any> = [];
  readonlyMetaProps: Array<string> = [];

  constructor(private utils: UtilsService) {
    this.sampleCategory = { ...SAMPLE_CATEGORY, id: this.utils.getUniqueFromString(SAMPLE_CATEGORY.metaInfo.title), created: utils.currentDate, updated: utils.currentDate };
    this.category = { ...this.sampleCategory };
    this.categoryFeatures = Object.keys(CategoryFeatures).map(key => ({ id: CategoryFeatures[key], title: CategoryFeatures[key] }));
    this.categoryMetaChanged = this.categoryMetaChanged.bind(this);
  }

  private initCategory() {
    if (this.value) {
      this.category = { ...this.value, metaInfo: { ...this.value.metaInfo } };

    } else {
      this.value = { ...this.sampleCategory, metaInfo: { ...this.sampleCategory.metaInfo } };
      this.category = { ...this.sampleCategory, metaInfo: { ...this.sampleCategory.metaInfo } };
    }

    // Init selected categories.
    this.selectedCategoryFeatures = this.category?.features?.map(f => ({ id: f })) || [];

    //Init meta form with readonly props
    this.readonlyMetaProps = this.readonlyTitle === true ? ['title'] : [];
  }

  ngOnInit(): void {
    this.initCategory();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initCategory();
  }

  public tabChanged(tab: Tab) {
    this.activeTab = tab;
  }

  public categoryMetaChanged(metaInfo: MetaInfo) {
    if (metaInfo.title !== this.value?.metaInfo?.title) {
      this.category.id = this.enableUniqueId ? this.utils.getUniqueFromString(metaInfo.title) : this.utils.toDashedString(metaInfo.title);
    } else {
      this.category.id = this.value.id;
    }

    this.category = { ...this.category, metaInfo: { ...metaInfo, url: this.utils.getCanonicalUrl('genre', this.category.id) } };
    this.changed.emit({ ...this.category });
  }

  public isLiveChanged(isLive: boolean): void {
    const inReview = isLive === true ? false : this.value.inReview;
    this.category = { ...this.category, isLive, inReview };
    this.isLiveClicked.emit({ ...this.category });
  }

  public inReviewChanged(inReview: boolean): void {
    const isLive = inReview === true ? false : this.value.isLive;
    this.category = { ...this.category, inReview, isLive };
    this.inReviewClicked.emit({ ...this.category });
  }

  public isFeaturedChanged(isFeatured: boolean): void {
    this.category = { ...this.category, isFeatured };
    this.changed.emit({ ...this.category });
  }

  public onShortTitleChanged(event: any): void {
    this.changed.emit({ ...this.category });
  }

  public changeImage(event: any, clear: boolean = false) {
    event.preventDefault();
    if (clear === true) {
      this.category.image = { src: '', alt: '' } as ImageInfo;
      this.category.metaInfo.image = '';
      this.changed.emit({ ...this.category });
    } else {
      this.toggleImageForm = true;
    }
  }

  public cancelImageChange() {
    this.toggleImageForm = false;
  }

  public saveImageChange(image: ImageInfo) {
    this.category.image = image;
    this.category.metaInfo.image = image.src;
    this.toggleImageForm = false;
    this.changed.emit({ ...this.category });
  }

  public saveCategory(event: any): void {
    event.preventDefault();
    this.saveClicked.emit({ ...this.category });
  }

  public deleteCategory(event: any): void {
    event.preventDefault();
    this.deleteClicked.emit({ ...this.category });
  }

  public onCategoryFeaturesChanged(selectedCategoryFeatures: Array<any> = []): void {
    this.category = { ...this.category, features: selectedCategoryFeatures?.map(catFeature => catFeature?.id) };
    this.selectedCategoryFeatures = [...selectedCategoryFeatures];
    this.changed.emit({ ...this.category });
  }

  public categoryIdDblClick(event: any): void {
    event.preventDefault();
    if (this.enableReadonlyIdToggle) {
      this.readonlyId = !this.readonlyId;
    }
  }
}
