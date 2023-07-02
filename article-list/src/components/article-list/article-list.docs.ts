
import { ARTICLE_ELEMENT } from '@annuadvent/ngx-cms/article/src/components/article-element/article-element.docs';
import { Article } from '@annuadvent/ngx-cms/article';

const article: Article = {
    id: 'sample-article',
    body: ARTICLE_ELEMENT,
    image: {
        src: '/assets/start-your-business.jpg',
        alt: 'Sample Article title',
    },
    metaInfo: {
        title: 'Sample Article title',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        image: '/assets/start-your-business.jpg',
    },
};

export const ARTICLES: Array<Article> = [1, 2, 3, 4, 5].map(n => ({ ...article, name: `${article.id}-${n}` }));

export const ArticleListComponent: any = {
    projectionContent: '',
    inputPropsValues: {
        items: [...ARTICLES]
    }
}
