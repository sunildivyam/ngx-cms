import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { ImageInfo } from '@annuadvent/ngx-cms/cms-image-form';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { Tab } from '@annuadvent/ngx-common-ui/tabs';
import { Article, ArticleFeatures } from '@annuadvent/ngx-cms/article';
import { Category } from '@annuadvent/ngx-cms/category';
import { EditorElement, EDITOR_ROOT_ELEMENT } from '@annuadvent/ngx-cms/content-editor';
import { ARTICLE_EDITOR_TABS } from '../../constants/article-editor.constants';

const SAMPLE_ARTICLE = {
  body: { ...EDITOR_ROOT_ELEMENT },
  metaInfo: {
    title: EDITOR_ROOT_ELEMENT.children[0]?.data?.text,
    description: EDITOR_ROOT_ELEMENT.children[1]?.data?.text,
  },
};

@Component({
  selector: 'anu-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit, OnChanges {
  @Input() value: Article | null;
  @Input() imageHelpText: string = '';
  @Input() readonlyId: boolean = true;
  @Input() readonlyTitle: boolean = false;
  @Input() enableUniqueId: boolean = true;
  @Input() enablePublish: boolean = true;
  @Input() enableDelete: boolean = true;
  @Input() enableReadonlyIdToggle: boolean = true;
  @Input() enableFeatures: boolean = true;
  @Input() enableOpenai: boolean = false;
  @Input() categories: Array<Category> = [];
  @Output() changed = new EventEmitter<Article>();
  @Output() saveClicked = new EventEmitter<Article>();
  @Output() isLiveClicked = new EventEmitter<Article>();
  @Output() inReviewClicked = new EventEmitter<Article>();
  @Output() deleteClicked = new EventEmitter<Article>();

  toggleImageForm: boolean = false;
  tabs: Array<Tab> = ARTICLE_EDITOR_TABS.map((t) => ({ ...t }));

  activeTab = this.tabs[0];
  article: Article;
  sampleArticle: Article;
  selectedArticleCategories: Array<any> = [];
  categoriesMultiSelectItems: Array<any> = [];
  selectedArticleFeatures: Array<any> = [];
  articleFeatures: Array<any> = [];
  readonlyMetaProps: Array<string> = [];

  constructor(private utils: UtilsService) {
    this.sampleArticle = {
      ...SAMPLE_ARTICLE,
      id: this.utils.getUniqueFromString(SAMPLE_ARTICLE.metaInfo.title),
      created: utils.currentDate,
      updated: utils.currentDate,
    };
    this.article = { ...this.sampleArticle };
    this.articleFeatures = Object.keys(ArticleFeatures).map((key) => ({
      id: ArticleFeatures[key],
      title: ArticleFeatures[key],
    }));
  }

  private initArticle() {
    if (this.value) {
      this.article = JSON.parse(JSON.stringify(this.value));
    } else {
      this.article = JSON.parse(JSON.stringify(this.sampleArticle));
      this.value = JSON.parse(JSON.stringify(this.sampleArticle));
    }

    // Init Article Categories
    this.selectedArticleCategories = this.article.categories?.map((cat) => ({
      id: cat,
    }));
    this.categoriesMultiSelectItems = this.categories?.map((cat) => ({
      id: cat?.id,
      title: cat?.metaInfo?.title,
    }));

    // Init ArticleFeatures
    this.selectedArticleFeatures =
      this.article?.features?.map((f) => ({ id: f, title: f })) || [];

    // Init Meta form with readonly props
    this.readonlyMetaProps = this.readonlyTitle === true ? ['title'] : [];
  }

  ngOnInit(): void {
    this.initArticle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initArticle();
  }

  public tabChanged(tab: Tab) {
    this.activeTab = tab;
  }

  public articleBodyChanged(body: EditorElement) {
    this.article = { ...this.article, body: { ...body } };
    this.changed.emit({ ...this.article });
  }

  public articleMetaChanged(metaInfo: MetaInfo) {
    if (metaInfo.title !== this.value.metaInfo.title) {
      this.article.id = this.enableUniqueId
        ? this.utils.getUniqueFromString(metaInfo.title)
        : this.utils.toDashedString(metaInfo.title);
    } else {
      this.article.id = this.value.id;
    }

    this.article = { ...this.article, metaInfo: { ...metaInfo } };
    this.changed.emit({ ...this.article });
  }

  public onCategoriesChanged(selectedCategories: Array<any> = []): void {
    this.article = {
      ...this.article,
      categories: selectedCategories?.map((cat) => cat?.id),
      metaInfo: {
        ...this.article.metaInfo,
        url: this.utils.getCanonicalUrl(
          'stories',
          this.article.id
        ),
      },
    };
    this.selectedArticleCategories = [...selectedCategories];
    this.changed.emit({ ...this.article });
  }

  public onArticleFeaturesChanged(
    selectedArticleFeatures: Array<any> = []
  ): void {
    this.article = {
      ...this.article,
      features: selectedArticleFeatures?.map((f) => f.id),
    };
    this.selectedArticleFeatures = [...selectedArticleFeatures];
    this.changed.emit({ ...this.article });
  }

  public isLiveChanged(isLive: boolean): void {
    const inReview = isLive === true ? false : this.value.inReview;
    this.article = { ...this.article, isLive, inReview };
    this.isLiveClicked.emit({ ...this.article });
  }

  public inReviewChanged(inReview: boolean): void {
    const isLive = inReview === true ? false : this.value.isLive;
    this.article = { ...this.article, isLive, inReview };
    this.inReviewClicked.emit({ ...this.article });
  }

  public changeImage(event: any, clear: boolean = false) {
    event.preventDefault();
    if (clear === true) {
      this.article.image = null;
      this.changed.emit({ ...this.article });
    } else {
      this.toggleImageForm = true;
    }
  }

  public cancelImageChange() {
    this.toggleImageForm = false;
  }

  public saveImageChange(image: ImageInfo) {
    this.article.image = image;
    this.article.metaInfo = {
      ...this.article.metaInfo,
      image: image?.src || '',
    };
    this.toggleImageForm = false;
    this.changed.emit({ ...this.article });
  }

  public saveArticle(event: any): void {
    event.preventDefault();
    this.saveClicked.emit({ ...this.article });
  }

  public deleteArticle(event: any): void {
    event.preventDefault();
    this.deleteClicked.emit({ ...this.article });
  }

  public articledDblClick(event: any): void {
    event.preventDefault();
    if (this.enableReadonlyIdToggle) {
      this.readonlyId = !this.readonlyId;
    }
  }
}
