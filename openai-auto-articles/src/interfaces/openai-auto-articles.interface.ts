import { OpenaiPrompt } from '@annuadvent/ngx-tools/openai';

export interface OpenaiPromptQueueItem {
  name: string;
  prompt: OpenaiPrompt;
  status: OpenaiPromptQueueItemStatus;
  timeTaken: number;
  heading?: string;
}

export interface OpenaiArticleQueueItem {
  name: string;
  openaiPromptQueue: Array<OpenaiPromptQueueItem>;
  promptQueueItemToAdd: OpenaiPromptQueueItem;
  saveStatus?: boolean;
  imagePromptText?: string;
}

export enum OpenaiPromptQueueItemStatus {
  notstarted = 'notstarted',
  inprogress = 'inprogress',
  failed = 'failed',
  completed = 'completed',
}

export interface OpenaiPromptQueueBatch {
  promptQueueItems: Array<OpenaiPromptQueueItem>;
  batchIndices: Array<number>;
}
