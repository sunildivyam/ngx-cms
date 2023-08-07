import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { ArticleEditorService } from '@annuadvent/ngx-cms/article-editor';
import { Html2JsonService } from '@annuadvent/ngx-cms/content-editor';
import {
  OpenaiService,
  OpenaiPrompt,
  OpenaiPromptTypeEnum,
  OpenaiImageSize,
  OpenaiConfigService,
  OpenaiConfig,
  OpenaiConfiguration,
} from '@annuadvent/ngx-tools/openai';
import {
  OpenaiPromptQueueItem,
  OpenaiPromptQueueItemStatus,
  OpenaiArticleQueueItem,
  OpenaiPromptQueueBatch,
} from '../../interfaces/openai-auto-articles.interface';
import {
  DESCRIPTION_PROMPT_NAME,
  EMPTY_PROMPT_QUEUE_ITEM,
  KEYWORDS_PROMPT_NAME,
  DESCRIPTION_PROMPT_PREFIX,
  KEYWORDS_PROMPT_PREFIX,
  OPENAI_MAX_REQUEST_COUNT,
  OPENAI_MAX_REQUEST_DELAY,
  OPENAI_FAILED_REQUEST_DELAY,
  SUBTOPICS_PROMPT_PREFIX,
  SUBTOPICS_PROMPT_NAME,
  QUESTIONS_PROMPT_PREFIX,
  QUESTIONS_PROMPT_NAME,
  PROMPTS_SEPARATOR,
} from '../../constants/openai-auto-articles.constants';
import { Article } from '@annuadvent/ngx-cms/article';
import { AppConfig, AppConfigService } from '@annuadvent/ngx-core/app-config';
import { FireArticlesHttpService } from '@annuadvent/ngx-tools/fire-cms';
import { EditorElement } from '@annuadvent/ngx-cms/content-editor';
import { FireStorageImageService } from '@annuadvent/ngx-tools/fire-storage';
import { FireAuthService } from '@annuadvent/ngx-tools/fire-auth';

@Component({
  selector: 'anu-openai-auto-articles',
  templateUrl: './openai-auto-articles.component.html',
  styleUrls: ['./openai-auto-articles.component.scss'],
})
export class OpenaiAutoArticlesComponent implements OnInit {
  @Input() openaiArticleQueue: Array<OpenaiArticleQueueItem> = [];
  @Input() openaiPromptQueueIndex: number = 0; // inprogress prompt index
  @Input() openaiArticleQueueIndex: number = 0; // inprogress article index

  errorMsg: Array<string> = [];
  isQueuePaused: boolean = true;
  isQueueStarted: boolean = false;
  isQueueFinished: boolean = false;
  promptQueueBatchJustBeforePause: OpenaiPromptQueueBatch = null;
  historyPrompts: Array<OpenaiPrompt> = [];

  //Bulk articles modal
  bulkArticlesPromptsText: string = '';
  toggleBulkArticlesModal: boolean = false;

  //Openai Config Modal
  toggleOpenaiConfigModal: boolean = false;

  //Timers
  expectedTotalTime: number = 0;
  ellapsedTime: number = 0;
  queueInterval: any = null;
  batchStartTime: number = 0;

  // resultPreview of queue items
  currentMdText: string = '';
  currentMdConvertedText: string = '';

  constructor(
    private utilsService: UtilsService,
    private aeService: ArticleEditorService,
    private openaiService: OpenaiService,
    public html2json: Html2JsonService,
    private fireArticlesHttpService: FireArticlesHttpService,
    private fireStorageImageService: FireStorageImageService,
    private fireAuthService: FireAuthService,
    private appConfigService: AppConfigService,
    private openaiConfigService: OpenaiConfigService,
  ) {
    this.openaiConfigService.config.subscribe((config: OpenaiConfiguration) => {
      const openaiConfig: OpenaiConfig = {
        apiKey: config?.apiKey?.value || '',
        organization: config?.headers?.value['OpenAI-Organization'].value || ''
      }

      openaiConfig?.apiKey && this.openaiService.initOpenai(openaiConfig);
    })
  }

  public ngOnInit(): void {
    this.openaiConfigService.initOpenai((this.appConfigService.openai as OpenaiConfig).apiKey, (this.appConfigService.openai as OpenaiConfig).organization);
  }

  public startTimer(): void {
    this.stopTimer();
    this.queueInterval = setInterval(() => {
      this.ellapsedTime++;
    }, 1000);
  }

  public stopTimer(): void {
    clearInterval(this.queueInterval);
  }

  public pauseQueue(): void {
    this.isQueuePaused = true;
    this.stopTimer();
  }

  public startQueue(): void {
    this.isQueuePaused = false;
    this.isQueueStarted = true;
    this.isQueueFinished = false;
    this.startTimer();
    this.processQueue(null);
  }

  public stopQueue(): void {
    this.isQueuePaused = false;
    this.isQueueStarted = true;
    this.isQueueFinished = true;
    this.stopTimer();
  }

  public togglePauseQueue(): void {
    if (this.isQueuePaused) {
      this.startQueue();
    } else {
      this.pauseQueue();
    }
  }

  public onBulkArticlesClick(): void {
    this.toggleBulkArticlesModal = true;
  }

  public onGenerateBulkArticleQueues(): void {
    this.toggleBulkArticlesModal = false;
    if (!this.bulkArticlesPromptsText.trim()) return;

    const promptTexts = this.bulkArticlesPromptsText.split(PROMPTS_SEPARATOR);
    promptTexts.forEach((pmtText) => {
      pmtText = pmtText.trim();
      const prompt: OpenaiPrompt = {
        prompt: pmtText,
        promptType: OpenaiPromptTypeEnum.content,
        message: { mdText: '', htmlText: '', jsonText: '' },
      };

      // Create a new articleQueue item and add its first prompts.
      pmtText && this.addToArticleQueue(prompt);
    });

    // resets the bulk prompt text
    this.bulkArticlesPromptsText = '';
  }

  public onNewPrompt(prompts: Array<OpenaiPrompt>): void {
    const prompt =
      (prompts && prompts.length && prompts[prompts.length - 1]) || null;
    if (!prompt) return;

    // Create a new articleQueue item and add its first prompts.
    this.addToArticleQueue(prompt);
  }

  public createOpenaiPromptQueueItem(
    prompt: OpenaiPrompt,
    promptType: OpenaiPromptTypeEnum = OpenaiPromptTypeEnum.content
  ): OpenaiPromptQueueItem {
    if (!prompt) return null;

    const promptQueueItem: OpenaiPromptQueueItem = {
      name: prompt.prompt,
      prompt: this.utilsService.deepCopy(prompt),
      status: OpenaiPromptQueueItemStatus.notstarted,
      timeTaken: 0,
      heading: prompt.prompt,
    };

    switch (promptType) {
      case OpenaiPromptTypeEnum.description:
        promptQueueItem.name = DESCRIPTION_PROMPT_NAME;
        promptQueueItem.prompt.promptType = OpenaiPromptTypeEnum.description;
        promptQueueItem.prompt.prompt = `${DESCRIPTION_PROMPT_PREFIX} ${promptQueueItem.prompt.prompt}`;
        promptQueueItem.heading = DESCRIPTION_PROMPT_NAME;

        break;
      case OpenaiPromptTypeEnum.keywords:
        promptQueueItem.name = KEYWORDS_PROMPT_NAME;
        promptQueueItem.prompt.promptType = OpenaiPromptTypeEnum.keywords;
        promptQueueItem.prompt.prompt = `${KEYWORDS_PROMPT_PREFIX} ${promptQueueItem.prompt.prompt}`;
        promptQueueItem.heading = KEYWORDS_PROMPT_NAME;
        break;
      case OpenaiPromptTypeEnum.subtopics:
        promptQueueItem.name = SUBTOPICS_PROMPT_NAME;
        promptQueueItem.prompt.promptType = OpenaiPromptTypeEnum.subtopics;
        promptQueueItem.prompt.prompt = `${SUBTOPICS_PROMPT_PREFIX} ${promptQueueItem.prompt.prompt}`;
        promptQueueItem.heading = SUBTOPICS_PROMPT_NAME;
        break;
      case OpenaiPromptTypeEnum.questions:
        promptQueueItem.name = QUESTIONS_PROMPT_NAME;
        promptQueueItem.prompt.promptType = OpenaiPromptTypeEnum.questions;
        promptQueueItem.prompt.prompt = `${QUESTIONS_PROMPT_PREFIX} ${promptQueueItem.prompt.prompt}`;
        promptQueueItem.heading = QUESTIONS_PROMPT_NAME;
        break;
      default:
        promptQueueItem.prompt.promptType = OpenaiPromptTypeEnum.content;
    }

    return promptQueueItem;
  }

  public addToArticleQueue(prompt: OpenaiPrompt): void {
    if (!prompt) return;
    // Article's first prompt
    const promptQueueItem = this.createOpenaiPromptQueueItem(prompt);

    // Article's (subtopics prompt)
    const subtopicsPromptQueueItem = this.createOpenaiPromptQueueItem(
      prompt,
      OpenaiPromptTypeEnum.subtopics
    );

    // Article's (questions prompt)
    const questionsPromptQueueItem = this.createOpenaiPromptQueueItem(
      prompt,
      OpenaiPromptTypeEnum.questions
    );

    // Article's (description prompt)
    const descriptionPromptQueueItem = this.createOpenaiPromptQueueItem(
      prompt,
      OpenaiPromptTypeEnum.description
    );

    // Article's (keywords prompt)
    const keywordsPromptQueueItem = this.createOpenaiPromptQueueItem(
      prompt,
      OpenaiPromptTypeEnum.keywords
    );

    const openaiArticleQueueItem: OpenaiArticleQueueItem = {
      name: prompt.prompt,
      openaiPromptQueue: [
        promptQueueItem,
        subtopicsPromptQueueItem,
        questionsPromptQueueItem,
        keywordsPromptQueueItem,
        descriptionPromptQueueItem,
      ],
      promptQueueItemToAdd: this.utilsService.deepCopy(EMPTY_PROMPT_QUEUE_ITEM),
      imagePromptText: prompt.prompt,
      saveStatus: true,
    };

    this.openaiArticleQueue.push(openaiArticleQueueItem);
  }

  public removePromptFromQueue(artQindex, pmtQindex): void {
    this.openaiArticleQueue[artQindex].openaiPromptQueue.splice(pmtQindex, 1);
  }

  public showQueueItemResultModal(artQindex, pmtQindex): void {
    this.currentMdText = this.openaiArticleQueue[artQindex].openaiPromptQueue[pmtQindex].prompt?.message?.mdText || '';
    this.currentMdConvertedText = this.currentMdText;
  }

  public addPromptToArticleQueue(artQindex): void {
    const articleQItem = this.openaiArticleQueue[artQindex];
    const promptText = articleQItem.promptQueueItemToAdd?.prompt?.prompt || '';

    if (!promptText.trim()) return;

    const newPromptQItem: OpenaiPromptQueueItem = this.utilsService.deepCopy(
      articleQItem.promptQueueItemToAdd
    );
    newPromptQItem.name = promptText;
    this.openaiArticleQueue[artQindex].openaiPromptQueue.push(newPromptQItem);

    // reset the item to add
    this.openaiArticleQueue[artQindex].promptQueueItemToAdd =
      this.utilsService.deepCopy(EMPTY_PROMPT_QUEUE_ITEM);
  }

  public processQueue(promptQueueBatch: OpenaiPromptQueueBatch): void {
    this.batchStartTime = Date.now();

    if (this.isQueuePaused) {
      // cache previous pending batch, as Queue is paused.
      if (promptQueueBatch)
        this.promptQueueBatchJustBeforePause = promptQueueBatch;
      return;
    } else {
      if (!promptQueueBatch) {
        // Resume from where it was paused
        promptQueueBatch = this.utilsService.deepCopy(
          this.promptQueueBatchJustBeforePause
        );
        this.promptQueueBatchJustBeforePause = null;
      }
    }

    // If this is a not a failed call to processQueue(), then create a batch.
    if (!promptQueueBatch) {
      promptQueueBatch = this.createBatchOfPromptQueueItems();
    }
    const { promptQueueItems, batchIndices } = promptQueueBatch;

    // Increment current openaiPromptQueueIndex, with last item being in progress
    this.updateOpenaiPromptQueueIndex(batchIndices);

    // Set status as inprogress of the batch
    this.updatePromptQueueBatchStatus(
      this.openaiArticleQueueIndex,
      batchIndices,
      OpenaiPromptQueueItemStatus.inprogress
    );

    //Create the prompt promises for the batch
    const batchPromises = promptQueueItems.map((item) =>
      this.openaiService.getChatResponse([item.prompt.prompt])
    );

    // Wait for success/failure and process results
    Promise.allSettled(batchPromises).then((results) => {
      const faileditemsIndices: Array<number> = [];
      const faileditems: Array<OpenaiPromptQueueItem> = [];

      results.forEach((item, index) => {
        const pmtQItem =
          this.openaiArticleQueue[this.openaiArticleQueueIndex]
            .openaiPromptQueue[batchIndices[index]];
        if (item.status === 'fulfilled') {
          // Write result back to original promptQueue, on successful prompt
          pmtQItem.prompt.message.mdText = item.value;
          pmtQItem.status = OpenaiPromptQueueItemStatus.completed;
          pmtQItem.timeTaken = Date.now() - this.batchStartTime;
        } else {
          // On Prompt Failure, set status and processQueue agin with failed prompts after a delay.
          pmtQItem.status = OpenaiPromptQueueItemStatus.failed;
          pmtQItem.timeTaken = Date.now() - this.batchStartTime;
          faileditems.push(pmtQItem);
          faileditemsIndices.push(batchIndices[index]);
          this.errorMsg.push(
            `<span class="error">Article Queue:</span> ${this.openaiArticleQueueIndex + 1
            } | ${pmtQItem.name} | ${item.reason}`
          );
        }
      });

      // If there are some failed prompts, then re-attempt, after some time
      if (faileditems.length) {
        this.onPromptQueueBatchFailure({
          promptQueueItems: faileditems,
          batchIndices: faileditemsIndices,
        });
      } else {
        // On success
        this.onPromptQueueBatchSuccess(
          this.openaiArticleQueueIndex,
          batchIndices
        );

        // Update current Indices and process next batch if available.
        this.processQueueForNextBatch();
      }
    });
  }

  public createBatchOfPromptQueueItems(): OpenaiPromptQueueBatch {
    const currentPromptQueue: OpenaiArticleQueueItem =
      this.openaiArticleQueue[this.openaiArticleQueueIndex];
    const startIndex = this.openaiPromptQueueIndex;

    const promptQueueItems = currentPromptQueue.openaiPromptQueue.slice(
      startIndex,
      startIndex + OPENAI_MAX_REQUEST_COUNT
    );

    const batchIndices = promptQueueItems.map(
      (item, index) => startIndex + index
    );

    // Increment current openaiPromptQueueIndex, with last item being in progress
    this.updateOpenaiPromptQueueIndex(batchIndices);

    return { promptQueueItems, batchIndices };
  }

  public updateOpenaiPromptQueueIndex(batchIndices: Array<number>): void {
    // Increment current openaiPromptQueueIndex, with last item being in progress
    if (this.openaiPromptQueueIndex <= batchIndices[batchIndices.length - 1]) {
      this.openaiPromptQueueIndex = batchIndices[batchIndices.length - 1] + 1;
    }
  }

  public onPromptQueueBatchSuccess(
    articleQueueIndex: number,
    batchIndices: Array<number>
  ): void {
    // Update article
    this.updateArticlePromptQueue(articleQueueIndex, batchIndices);
  }

  public onPromptQueueBatchFailure(failedBatch: OpenaiPromptQueueBatch): void {
    this.utilsService
      .delay(OPENAI_FAILED_REQUEST_DELAY)
      .then(() => this.processQueue(failedBatch));
  }

  public updateArticlePromptQueue(
    articleQueueIndex: number,
    batchIndices: Array<number>
  ) {
    batchIndices.forEach((itemIndex) => {
      const promptQueueItem =
        this.openaiArticleQueue[articleQueueIndex].openaiPromptQueue[itemIndex];
      const jsonEl = this.html2json.md2json(promptQueueItem.prompt.message.mdText);
      switch (promptQueueItem.prompt.promptType) {
        case OpenaiPromptTypeEnum.questions:
          this.generatePromptQueueItemsFromKeywords(jsonEl);
          break;
        case OpenaiPromptTypeEnum.subtopics:
          this.generatePromptQueueItemsFromKeywords(jsonEl);
          break;
        case OpenaiPromptTypeEnum.keywords:
          break;
        case OpenaiPromptTypeEnum.description:
          break;
        default:
      }
    });
  }

  public generatePromptQueueItemsFromKeywords(jsonEl: EditorElement) {
    const keywords = this.aeService.readKeywordsFromEditorElement(jsonEl);
    keywords.forEach((keyword) => {
      const pmtQItem: OpenaiPromptQueueItem = this.utilsService.deepCopy(
        EMPTY_PROMPT_QUEUE_ITEM
      );
      pmtQItem.name = keyword;
      pmtQItem.prompt.prompt = keyword;
      pmtQItem.prompt.promptType = OpenaiPromptTypeEnum.content;
      pmtQItem.status = OpenaiPromptQueueItemStatus.notstarted;
      this.openaiArticleQueue[
        this.openaiArticleQueueIndex
      ].openaiPromptQueue.push(pmtQItem);
    });
  }

  public updatePromptQueueBatchStatus(
    articleQueueIndex: number,
    batchIndices: Array<number>,
    status: OpenaiPromptQueueItemStatus
  ) {
    // Set status
    const currentPromptQueue: OpenaiArticleQueueItem =
      this.openaiArticleQueue[articleQueueIndex];
    batchIndices.forEach(
      (itemIndex) =>
        (currentPromptQueue.openaiPromptQueue[itemIndex].status = status)
    );
  }

  public processQueueForNextBatch(): void {
    // if NOT end of both artQ and pmtQ is reached, process further
    const articleQueueCount = this.openaiArticleQueue.length;
    const promptQueueCount =
      this.openaiArticleQueue[this.openaiArticleQueueIndex].openaiPromptQueue
        .length;
    const isEndOfAllQueues =
      this.openaiArticleQueueIndex >= articleQueueCount - 1 &&
      this.openaiPromptQueueIndex >= promptQueueCount - 1;

    if (isEndOfAllQueues) {
      this.stopQueue();
      this.saveArticle(this.openaiArticleQueueIndex);
      return;
    }

    if (this.openaiPromptQueueIndex >= promptQueueCount - 1) {
      // As current article Q is Finished, let's save the article to firebase.
      this.saveArticle(this.openaiArticleQueueIndex);
      this.openaiArticleQueueIndex++;
      this.openaiPromptQueueIndex = 0;
    }

    const timeToWaitForNextBatch =
      OPENAI_MAX_REQUEST_DELAY - (Date.now() - this.batchStartTime);
    if (timeToWaitForNextBatch > 0) {
      this.utilsService.delay(timeToWaitForNextBatch).then(() => {
        this.processQueue(null);
      });
    } else {
      this.processQueue(null);
    }
  }

  public saveArticle(artQIndex: number) {
    const artQItem = this.openaiArticleQueue[artQIndex];
    if (artQItem.saveStatus === true) return;

    const article: Article = this.aeService.createInitializedArticle(
      artQItem.name,
    );

    artQItem.openaiPromptQueue.forEach((item, index) => {
      const jsonEl = this.aeService.cleanAndFormatEditorEl(
        this.html2json.md2json(item.prompt.message.mdText),
      );
      if (jsonEl) {
        if (index === 0) {
          article.body = jsonEl;
        } else {
          switch (item.prompt.promptType) {
            case OpenaiPromptTypeEnum.keywords:
              article.metaInfo.keywords = this.aeService
                .readKeywordsFromEditorElement(jsonEl)
                .join(', ');
              article.metaInfo['article:tag'] = article.metaInfo.keywords;
              break;
            case OpenaiPromptTypeEnum.description:
              article.metaInfo.description =
                this.aeService.readDescriptionFromEditorElement(jsonEl);
              break;
            case OpenaiPromptTypeEnum.questions:
              break;
            case OpenaiPromptTypeEnum.subtopics:
              break;
            default:
              article.body.children = [].concat(
                article.body.children,
                this.aeService.generateArticleSubheading(item.heading),
                jsonEl.children
              );
          }
        }
      }
    });

    this.generateAndSaveArticleImage(
      article.id,
      artQItem.imagePromptText,
      artQIndex
    ).then((imgUrl) => {
      article.image.src = imgUrl;
      article.metaInfo.image = imgUrl;

      // Save article to firebase
      this.fireArticlesHttpService
        .addArticle(article)
        .then((art) => {
          artQItem.saveStatus = true;
          this.errorMsg.push(
            `Article (${artQIndex + 1}) Saved: ${artQItem.name} id: ${art.id}`
          );
        })
        .catch((err) => {
          artQItem.saveStatus = false;
          this.errorMsg.push(
            `<span class="error">Error Saving Article (${artQIndex + 1
            }):</span>: ${artQItem.name} | ${err.message}`
          );
        });
    });
  }

  public async generateAndSaveArticleImage(
    articleId: string,
    articleTitle: string,
    artQIndex: number
  ): Promise<string> {
    let base64Image: string = '';

    try {
      const base64Images = await this.openaiService.getImagetResponse(
        articleTitle,
        1,
        OpenaiImageSize._1024x1024
      );
      base64Image = base64Images.length && base64Images[0];
      this.errorMsg.push(
        `<span class="success">Generated Article ${artQIndex + 1} Image </span>`
      );
    } catch (err) {
      this.errorMsg.push(
        `<span class="error">Error generating Article ${artQIndex + 1
        } Image </span>| ${err.message}`
      );

      return '';
    }

    try {
      const imageFileInfo = await this.fireStorageImageService.uploadImage(
        `${articleId}.jpg`,
        base64Image,
        true,
        this.fireAuthService.getCurrentUserId(),
        true
      );
      this.errorMsg.push(
        `<span class="success">Uploaded Article ${artQIndex + 1} Image </span>`
      );
      return this.aeService.generateArticleImageUrl(imageFileInfo.fullPath);
    } catch (err) {
      this.errorMsg.push(
        `<span class="error">Error Saving Article ${artQIndex + 1
        } Image </span>| ${err.message}`
      );

      return '';
    }
  }
}
