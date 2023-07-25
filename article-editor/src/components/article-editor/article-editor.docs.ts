
import { Category } from "@annuadvent/ngx-cms/category";

export const SAMPLE_CATEGORIES: Array<Category> = [
    {
        id: 'sample-category-1',
        metaInfo: {
            title: 'Sample Category 1'
        }
    },
    {
        id: 'sample-category-2',
        metaInfo: {
            title: 'Sample Category 2'
        }
    },
    {
        id: 'sample-category-3',
        metaInfo: {
            title: 'Sample Category 3'
        }
    },
    {
        id: 'sample-category-4',
        metaInfo: {
            title: 'Sample Category 4'
        }
    },
]


export const ArticleEditorComponent: any = {
    projectionContent: '',
    inputPropsValues: {
        categories: SAMPLE_CATEGORIES,
        enableOpenai: true,
    }
}
