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

export const OpenaiAutoArticlesComponent: any = {
  projectionContent: '',
  inputPropsValues: {
    openaiArticleQueue: [],
  },
};
