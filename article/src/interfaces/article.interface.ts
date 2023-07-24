import { EditorElement } from '@annuadvent/ngx-cms/content-editor';
import { ImageInfo } from '@annuadvent/ngx-common-ui/image-form';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { Category } from '@annuadvent/ngx-cms/category';

export interface Article {
  id?: string; // dash separated article id, that can be used as router path.has to be unique, based on article title.
  metaInfo?: MetaInfo; // This info will be used for SEO for the page., title, description, keywords etc.
  image?: ImageInfo; // Thumbnail Image src
  body?: EditorElement;
  categories?: Array<string>;
  categoriesGroup?: Array<Category>;
  created?: string;
  updated?: string;
  userId?: string; // User Id from Users
  isLive?: boolean; // true if published and live to web.
  inReview?: boolean; // true if the article is up for review, if true, then isLive must be false
  features?: Array<string | ArticleFeatures>;
}

export enum ArticleFeatures {
  featured = 'featured',
  primaryNavigation = 'primary-navigation',
  footerNavigation = 'footer-navigation',
  primeShow = 'prime-show',
  footerShow = 'footer-show',
  primeShowAside = 'prime-show-aside',
  mainShow = 'main-show',
  inReview = 'in-review',
  tnc = 'tnc',
  privacy = 'privacy',
  helpDocs = 'help-docs',
  helpDocsAuthor = 'help-docs-author',
  helpDocsAdmin = 'help-docs-admin',
}
