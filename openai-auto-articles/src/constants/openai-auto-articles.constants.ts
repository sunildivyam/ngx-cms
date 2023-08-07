import {
    OpenaiPrompt,
    OpenaiPromptTypeEnum,
} from '@annuadvent/ngx-tools/openai';
import { OpenaiPromptQueueItem, OpenaiPromptQueueItemStatus } from '../interfaces/openai-auto-articles.interface';

export const EMPTY_PROMPT_QUEUE_ITEM: OpenaiPromptQueueItem = {
    name: '',
    prompt: {
        prompt: '',
        message: {
            mdText: '',
            htmlText: '',
            jsonText: ''
        },
        promptType: OpenaiPromptTypeEnum.content
    } as OpenaiPrompt,
    status: OpenaiPromptQueueItemStatus.notstarted,
    timeTaken: 0,
    heading: '',
};

export const DESCRIPTION_PROMPT_NAME = 'description';
export const KEYWORDS_PROMPT_NAME = 'keywords';
export const SUBTOPICS_PROMPT_NAME = 'subtopics';
export const QUESTIONS_PROMPT_NAME = 'questions';

export const DESCRIPTION_PROMPT_PREFIX = 'Write a good description for';
export const KEYWORDS_PROMPT_PREFIX = 'List good keywords or subtopics for';
export const SUBTOPICS_PROMPT_PREFIX = 'List 2 good closely related subtopics for';
export const QUESTIONS_PROMPT_PREFIX = 'List 2 good related questions for';


export const OPENAI_MAX_REQUEST_COUNT = 3;
export const OPENAI_MAX_REQUEST_DELAY = 65000;
export const OPENAI_FAILED_REQUEST_DELAY = 25000;

export const PROMPTS_SEPARATOR = '|||';
