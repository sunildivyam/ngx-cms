import { Tab } from '@annuadvent/ngx-common-ui/tabs';

export const ARTICLE_EDITOR_TABS: Array<Tab> = [
  {
    name: 'metainfo',
    title: 'Article Info',
  } as Tab,
  {
    name: 'article',
    title: 'Content',
  } as Tab,
  {
    name: 'moreinfo',
    title: 'More Info',
  } as Tab,
  {
    name: 'publish',
    title: 'Publish',
  } as Tab,
];

export const DESCRIPTION_PROMPT_PREFIX = 'Write a good description for ';
export const KEYWORDS_PROMPT_PREFIX = 'List good keywords for ';
export const CONTENT_PROMPT_PREFIX = '';
export const OPENAI_REQUESTS_LIMIT = 3;
export const OPENAI_REQUEST_TIME_LIMIT = 62000; //miliseconds or 1 min

export const MAX_STRONG_FORMATTING_CHAR_COUNT = 60;
