import { AppConfig } from '@annuadvent/ngx-core/app-config';
import { OpenaiPromptTypeEnum } from '@annuadvent/ngx-tools/openai';

import { EMPTY_PROMPT_QUEUE_ITEM } from '../../constants/openai-auto-articles.constants';
import {
  OpenaiPromptQueueItemStatus,
  OpenaiArticleQueueItem,
} from '../../interfaces/openai-auto-articles.interface';

export const openaiArticleQueue: Array<OpenaiArticleQueueItem> = [
  {
    name: 'Sample prompt text 1',
    openaiPromptQueue: [
      {
        name: 'Sample prompt text 1',
        prompt: {
          prompt: 'Sample prompt text 1',
          promptType: OpenaiPromptTypeEnum.content,
          message: {
            mdText: '',
            htmlText: '',
            jsonText: '',
          },
        },
        status: OpenaiPromptQueueItemStatus.notstarted,
        timeTaken: 0,
      },
      {
        name: 'Sample prompt text 2',
        prompt: {
          prompt: 'Sample prompt text 2',
          promptType: OpenaiPromptTypeEnum.content,
          message: {
            mdText: '',
            htmlText: '',
            jsonText: '',
          },
        },
        status: OpenaiPromptQueueItemStatus.notstarted,
        timeTaken: 0,
      },
      {
        name: 'Sample prompt text 3',
        prompt: {
          prompt: 'Sample prompt text 3',
          promptType: OpenaiPromptTypeEnum.keywords,
          message: {
            mdText: '',
            htmlText: '',
            jsonText: '',
          },
        },
        status: OpenaiPromptQueueItemStatus.inprogress,
        timeTaken: 10,
      },
      {
        name: 'Sample prompt text 4',
        prompt: {
          prompt: 'Sample prompt text 4',
          promptType: OpenaiPromptTypeEnum.description,
          message: {
            mdText: '',
            htmlText: '',
            jsonText: '',
          },
        },
        status: OpenaiPromptQueueItemStatus.completed,
        timeTaken: 150,
      },
      {
        name: 'Sample prompt text 5',
        prompt: {
          prompt: 'Sample prompt text 5',
          promptType: OpenaiPromptTypeEnum.content,
          message: {
            mdText: '',
            htmlText: '',
            jsonText: '',
          },
        },
        status: OpenaiPromptQueueItemStatus.failed,
        timeTaken: 0,
      },
    ],
    promptQueueItemToAdd: JSON.parse(JSON.stringify(EMPTY_PROMPT_QUEUE_ITEM))
  }
];

export const appConfig: AppConfig = {
  name: 'annuBusiness',
  copyrightText: 'copyright©annu-business',
  themeName: 'skyBlue',
  loginUrl: '/login',
  logoutUrl: '/login',
  profileUrl: '/dashboard',
  adminEmail: 'info@annubiztech.com',
  defaultPageSize: 5,
  tNcUrl: '/terms-and-conditions-lbxuxsj774zpe3xh/terms-and-conditions-lbxv0dakpn1x6px',
  privacyPolicyUrl: '/terms-and-conditions-lbxuxsj774zpe3xh/terms-and-conditions-lbxv0dakpn1x6px',
  contactUsUrl: '/contact-us/contact-us-for-sales-enquiry-technology-consulting-business-consulting-research-consulting-or-a-general-enquiry',
  aboutUsUrl: '/about-us/about-annu-advent',
  metaInfo: {
    "title": "Annu Business",
    "description": "Annu Business is a dynamic and innovative team of digital content creators who are passionate about crafting captivating and immersive experiences for audiences across various digital platforms. With our diverse skill set and expertise, we specialize in producing high-quality and engaging content that leaves a lasting impact. At Annu Business we are driven by our commitment to excellence, innovation, and audience satisfaction. We embrace the ever-evolving digital landscape, constantly pushing boundaries, and exploring new avenues to deliver content that resonates with our viewers, readers, and listeners. Join us on this exciting journey as we continue to shape the digital content landscape with our creativity, expertise, and unwavering dedication.",
    "keywords": "Annu Business, Visual storytelling, Video content creators, Vlogs, Tutorials, Short films, Informative articles, Social media influencers, Entertaining stories, In-depth interviews, Graphic designers, Artists, Digital artwork, Infographics, Evolving digital landscape",
    "robots": "index, follow",
    "Content-Type": "text/html; charset=utf-8",
    "language": "english",
    "revisit-after": "7 days",
    "author": "Annu Business",
    "type": "article",
    "article:published_time": "2022-01-03T17:53:35.868Z",
    "article:author": "Annu Business",
    "article:section": "business",
    "article:tag": "Annu Business, Visual storytelling, Video content creators, Vlogs, Tutorials, Short films, Informative articles, Social media influencers, Entertaining stories, In-depth interviews, Graphic designers, Artists, Digital artwork, Infographics, Evolving digital landscape",
    "image": "image/url",
    "url": "https://github.com/sunildivyam/annu-ng-lib",
    "card": "summary_large_image",
    "site_name": "Annu Business",
    "audio": "",
    "video": ""
  },
  mainMenuItems: [
    {
      title: 'Sample Category 1',
      href: ['./sample-category-1'],
    },
    {
      title: 'Sample Category 2',
      href: ['./sample-category-2'],
    },
    {
      title: 'Sample Category 3',
      href: ['./sample-category-3'],
    },
    {
      title: 'Sample Category 4',
      href: ['./sample-category-4'],
    }
  ]
};

export const OpenaiAutoArticlesComponent: any = {
  projectionContent: '',
  inputPropsValues: {
    openaiArticleQueue: [],
    appConfig,
  },
};
