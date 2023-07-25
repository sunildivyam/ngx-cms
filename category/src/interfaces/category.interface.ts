import { ImageInfo } from '@annuadvent/ngx-common-ui/image-form';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';

export interface Category {
  id?: string;
  shortTitle?: string;
  isFeatured?: boolean; // true, if featured category, this can be shown at primary locations on page.
  metaInfo?: MetaInfo; // This info will be used for SEO for the page., title, description, keywords etc.
  image?: ImageInfo; // Thumbnail Image src
  created?: string;
  updated?: string;
  userId?: string; // User Id from Users
  isLive?: boolean;
  inReview?: boolean; // if category is up for review, if this is true, then isLive must be false;
  features?: Array<CategoryFeatures | string>; // any of the values from CategoryFeature, and any custom values.
}

export enum CategoryFeatures {
  primaryNavigation = 'primary-navigation',
  footerNavigation = 'footer-navigation',
  primeShow = 'prime-show',
  footerShow = 'footer-show',
  primeShowAside = 'prime-show-aside',
  inReview = 'in-review',
  tnc = 'tnc',
  privacy = 'privacy',
  helpDocs = 'help-docs',
  helpDocsAuthor = 'help-docs-author',
  helpDocsAdmin = 'help-docs-admin',
  aboutUs = 'about-us',
  contactUs = 'contact-us',
  vision = 'vision',
}
