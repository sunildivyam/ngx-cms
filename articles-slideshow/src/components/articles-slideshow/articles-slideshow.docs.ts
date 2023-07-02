
import { ARTICLE } from '@annuadvent/ngx-cms/article/src/components/article/article.docs';

export const ArticlesSlideshowComponent: any = {
  projectionContent: '',
  inputPropsValues: {
    articles: [{ ...ARTICLE }, { ...ARTICLE }, { ...ARTICLE }, { ...ARTICLE }],
    isRowlayout: true,
    size: 'sm',
    descriptionCharCount: 200,
  },
};
