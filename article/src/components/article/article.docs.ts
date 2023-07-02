import { UtilsService } from '@annuadvent/ngx-core/utils';
import { ARTICLE_ELEMENT } from '../article-element/article-element.docs';

const utilsSvc = new UtilsService();

export const ARTICLE = {
    id: 'sample-article',
    body: ARTICLE_ELEMENT,
    created: utilsSvc.currentDate,
    updated: utilsSvc.currentDate,
    isLive: false,
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

export const ArticleComponent: any = {
    projectionContent: '',
    inputPropsValues: {
        value: ARTICLE
    }
}
