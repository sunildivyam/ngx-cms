import { Component, OnDestroy, OnInit } from '@angular/core';
import { AiArticlesService } from '../../services/ai-articles.service';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { Html2JsonService } from '@annuadvent/ngx-cms/content-editor';
import { FireArticlesHttpService } from '@annuadvent/ngx-tools/fire-cms';
import { Queue, QueueItem, QueueStatusEnum } from '@annuadvent/ngx-tools/queue';
import { OpenaiConfig, OpenaiConfigService, OpenaiConfiguration, OpenaiImageSize, OpenaiPrompt, OpenaiPromptTypeEnum, OpenaiService } from '@annuadvent/ngx-tools/openai';
import { AI_FAILED_REQUEST_DELAY, AI_MAX_REQUEST_COUNT, AI_MAX_REQUEST_DELAY, DESCRIPTION_PROMPT_NAME, DESCRIPTION_PROMPT_PREFIX, KEYWORDS_PROMPT_NAME, KEYWORDS_PROMPT_PREFIX, PROMPTS_SEPARATOR, QUESTIONS_PROMPT_NAME, QUESTIONS_PROMPT_PREFIX, SUBTOPICS_PROMPT_NAME, SUBTOPICS_PROMPT_PREFIX } from '../../constants/ai-articles.constants';
import { ArticlePrompt } from '../../interfaces/ai-articles.interface';
import { Subscription } from 'rxjs';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { ArticleEditorService } from '@annuadvent/ngx-cms/article-editor';
import { Article } from '@annuadvent/ngx-cms/article';
import { FireStorageImageService, ImageFileInfo } from '@annuadvent/ngx-tools/fire-storage';
import { FireAuthService } from '@annuadvent/ngx-tools/fire-auth';
/**
 * AiArticles Component generates articles using AI apis, It works in a Queue, so that the process can be paused and resumed any time.
 * Keeps showing the progress and status of whole queue as well as Queue items. All completed items are saved to articles data base.
 *
 */
@Component({
  selector: 'anu-ai-articles',
  templateUrl: './ai-articles.component.html',
  styleUrls: ['./ai-articles.component.scss']
})
export class AiArticlesComponent implements OnDestroy, OnInit {

  // Bulk articles modal
  toggleBulkArticlesModal: boolean = false;
  bulkArticlesPromptsText: string = '';

  //Openai Config Modal
  toggleOpenaiConfigModal: boolean = false;

  // Single Article prompt
  historyPrompts: Array<OpenaiPrompt> = [];

  // Preview Result Modal
  currentMdText: string = '';
  currentMdConvertedText: string = '';


  // Batch process
  articlesBatch: Array<QueueItem> = null;
  promptsBatch: Array<QueueItem> = null;
  articlesBatchSubscription: Subscription = null;
  promptBatchSubscription: Subscription = null;
  promptStatusSubscription: Subscription = null;

  // Error Messages
  errors: Array<string> = [];

  //  Save status
  articleSaveStatus = {};

  constructor(
    public aiArticlesService: AiArticlesService,
    private utilsService: UtilsService,
    private openaiService: OpenaiService,
    private openaiConfigService: OpenaiConfigService,
    private articleEditorService: ArticleEditorService,
    private fireArticlesHttpService: FireArticlesHttpService,
    private appConfigService: AppConfigService,
    public html2json: Html2JsonService,
    private fireStorageImageService: FireStorageImageService,
    private fireAuthService: FireAuthService,
  ) {
    // init openai
    this.openaiConfigService.config.subscribe((config: OpenaiConfiguration) => {
      const openaiConfig: OpenaiConfig = {
        apiKey: config?.apiKey?.value || '',
        organization: config?.headers?.value['OpenAI-Organization'].value || ''
      }

      openaiConfig?.apiKey && this.openaiService.initOpenai(openaiConfig);
    })

    // this.aiArticlesService.articlesQ.queue.subscribe(qItems => console.log(''));

    this.articlesBatchSubscription && this.articlesBatchSubscription.unsubscribe();

    this.articlesBatchSubscription = this.aiArticlesService.articlesQ.currentBatch.subscribe(articlesBatchItems => {
      this.onArticleSBatchChange(articlesBatchItems);
    });
  }

  ngOnInit(): void {
    this.openaiConfigService.initOpenai((this.appConfigService.openai as OpenaiConfig).apiKey, (this.appConfigService.openai as OpenaiConfig).organization);
  }

  ngOnDestroy(): void {
    this.articlesBatchSubscription && this.articlesBatchSubscription.unsubscribe();
    this.promptBatchSubscription && this.promptBatchSubscription.unsubscribe();
    this.promptStatusSubscription && this.promptStatusSubscription.unsubscribe();
  }

  private onArticleSBatchChange(articlesBatchItems: Array<QueueItem>): void {
    if (articlesBatchItems?.length) {
      articlesBatchItems.forEach(articleQItem => {
        const promptQ = (articleQItem.data as Queue);

        promptQ.start(
          AI_MAX_REQUEST_COUNT,
          AI_MAX_REQUEST_DELAY,
          AI_FAILED_REQUEST_DELAY,
        );

        this.promptBatchSubscription && this.promptBatchSubscription.unsubscribe();
        this.promptStatusSubscription && this.promptStatusSubscription.unsubscribe();

        this.promptBatchSubscription = promptQ.currentBatch.subscribe(promptQItems => {
          this.processArtPrompts(articleQItem, promptQ, promptQItems);
        });

        this.promptStatusSubscription = promptQ.status.subscribe(status => {
          // If Prompt Queue is completed successfully, then Save Article to DB and Mark ArticleQItem as completed.
          if (
            [QueueStatusEnum.paused, QueueStatusEnum.completed].includes(status) &&
            !promptQ.queueValue.find(item => item.status !== QueueStatusEnum.completed) &&
            this.articleSaveStatus[articleQItem.id] !== true
          ) {
            this.saveArticle(articleQItem);
          }
        });
      });
    }
  }

  /**
   * Add Additional Prompts from subtopics and questions.
   *
   * @param promptQ
   * @param promptQItem
   * @returns
   */
  public generateAdditionalPrompts(promptQ: Queue, promptQItem: QueueItem): void {

    const artPrompt = (promptQItem.data as ArticlePrompt);

    if (![OpenaiPromptTypeEnum.questions, OpenaiPromptTypeEnum.subtopics].includes(artPrompt.prompt.promptType)) return;

    const keywordsOrSubTopics = this.articleEditorService
      .readKeywordsFromEditorElement(
        this.html2json.md2json(artPrompt.prompt.message.mdText)
      );

    const promptQItems: Array<QueueItem> = keywordsOrSubTopics?.map(keyword => {
      const qItem = new QueueItem({
        id: keyword,
        status: QueueStatusEnum.notstarted,
        startTime: 0,
        completedTime: 0,
        data: {
          heading: keyword,
          prompt: {
            prompt: keyword,
            promptType: OpenaiPromptTypeEnum.content,
            message: {},
          } as OpenaiPrompt
        } as ArticlePrompt
      } as QueueItem);

      return qItem;
    });

    promptQItems?.length && promptQ.add(promptQItems);
  }

  public processArtPrompts(articleQItem: QueueItem, promptQ: Queue, promptQItems: Array<QueueItem>) {

    //Create the prompt promises for the batch
    const batchPromises = promptQItems.map((item: QueueItem) => {
      const artPrompt = item.data as ArticlePrompt;

      this.pushStatusMsg('Prompt Started...', 'warning', articleQItem.id, item.id);

      return artPrompt.prompt.promptType === OpenaiPromptTypeEnum.image ?
        this.openaiService.getImagetResponse(artPrompt.prompt.prompt, 1, OpenaiImageSize._1024x1024) :
        this.openaiService.getChatResponse([artPrompt.prompt.prompt])
    });

    // Wait for success/failure and process results
    Promise.allSettled(batchPromises).then((results) => {

      results.forEach((item, index) => {
        const promptQItem = promptQItems[index];

        if (item.status === 'fulfilled') {          // Write result back to original promptQueue, on successful prompt

          const artPrompt = (promptQItem.data as ArticlePrompt);

          artPrompt.prompt.message.mdText = artPrompt.prompt.promptType === OpenaiPromptTypeEnum.image ?
            (item.value as any)[0] :
            item.value as any;  // assign based on result

          promptQItem.complete();
          this.pushStatusMsg('Prompt DONE', 'success', articleQItem.id, promptQItem.id);
          this.generateAdditionalPrompts(promptQ, promptQItem);
        } else {
          // On Prompt Failure, set status and processQueue agin with failed prompts after a delay.
          promptQItem.fail();
          this.pushStatusMsg('Prompt Failed', 'error', articleQItem.id, promptQItem.id);
        }
      });

      // Update promptQueue back, that we are done with batch processing
      promptQ.updateQueueBatch(promptQItems);
    });
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
      pmtText && this.initAndAddNewArticleprompts(prompt);
    });

    // resets the bulk prompt text
    this.bulkArticlesPromptsText = '';
  }

  public onNewPrompt(prompts: Array<OpenaiPrompt>): void {
    const prompt =
      (prompts && prompts.length && prompts[prompts.length - 1]) || null;
    if (!prompt) return;

    // Create a new articleQueue item and add its first prompts.
    this.initAndAddNewArticleprompts(prompt);
  }

  public createArticlePrompt(
    prompt: OpenaiPrompt,
    promptType: OpenaiPromptTypeEnum = OpenaiPromptTypeEnum.content
  ): QueueItem {
    if (!prompt) return null;

    const qItem: QueueItem = new QueueItem();
    qItem.id = prompt.prompt;

    const articlePrompt: ArticlePrompt = {
      prompt: this.utilsService.deepCopy(prompt),
      heading: prompt.prompt,
    };

    switch (promptType) {
      case OpenaiPromptTypeEnum.description:
        qItem.id = `${DESCRIPTION_PROMPT_NAME}`;
        articlePrompt.prompt.promptType = OpenaiPromptTypeEnum.description;
        articlePrompt.prompt.prompt = `${DESCRIPTION_PROMPT_PREFIX} ${prompt.prompt}`;
        articlePrompt.heading = 'NA';

        break;
      case OpenaiPromptTypeEnum.keywords:
        qItem.id = `${KEYWORDS_PROMPT_NAME}`;
        articlePrompt.prompt.promptType = OpenaiPromptTypeEnum.keywords;
        articlePrompt.prompt.prompt = `${KEYWORDS_PROMPT_PREFIX} ${prompt.prompt}`;
        articlePrompt.heading = 'NA';
        break;

      case OpenaiPromptTypeEnum.subtopics:
        qItem.id = `${SUBTOPICS_PROMPT_NAME}`;
        articlePrompt.prompt.promptType = OpenaiPromptTypeEnum.subtopics;
        articlePrompt.prompt.prompt = `${SUBTOPICS_PROMPT_PREFIX} ${prompt.prompt}`;
        articlePrompt.heading = 'NA';
        break;
      case OpenaiPromptTypeEnum.questions:
        qItem.id = `${QUESTIONS_PROMPT_NAME}`;
        articlePrompt.prompt.promptType = OpenaiPromptTypeEnum.questions;
        articlePrompt.prompt.prompt = `${QUESTIONS_PROMPT_PREFIX} ${prompt.prompt}`;
        articlePrompt.heading = 'NA';
        break;
      case OpenaiPromptTypeEnum.image:
        qItem.id = `IMAGE`;
        articlePrompt.prompt.promptType = OpenaiPromptTypeEnum.image;
        articlePrompt.prompt.prompt = prompt.prompt;
        articlePrompt.heading = 'NA';
        break;
      default:
        articlePrompt.prompt.promptType = OpenaiPromptTypeEnum.content;
    }

    qItem.data = articlePrompt;

    return qItem;
  }

  public initAndAddNewArticleprompts(prompt: OpenaiPrompt): void {
    if (!prompt) return;

    // Article's first prompt
    const promptQueueItem = this.createArticlePrompt(prompt);

    // Article's (subtopics prompt)
    const subtopicsPromptQueueItem = this.createArticlePrompt(
      prompt,
      OpenaiPromptTypeEnum.subtopics
    );

    // Article's (questions prompt)
    const questionsPromptQueueItem = this.createArticlePrompt(
      prompt,
      OpenaiPromptTypeEnum.questions
    );

    // Article's (description prompt)
    const descriptionPromptQueueItem = this.createArticlePrompt(
      prompt,
      OpenaiPromptTypeEnum.description
    );

    // Article's (keywords prompt)
    const keywordsPromptQueueItem = this.createArticlePrompt(
      prompt,
      OpenaiPromptTypeEnum.keywords
    );

    // Article's (Image prompt)
    const imagePromptQueueItem = this.createArticlePrompt(
      prompt,
      OpenaiPromptTypeEnum.image
    );

    const articleQ = new Queue();
    articleQ.add([
      promptQueueItem,
      subtopicsPromptQueueItem,
      questionsPromptQueueItem,
      keywordsPromptQueueItem,
      descriptionPromptQueueItem,
      imagePromptQueueItem,
    ]);

    const articlesQItem = new QueueItem();
    articlesQItem.id = prompt.prompt;
    articlesQItem.data = articleQ;

    this.aiArticlesService.articlesQ.add([articlesQItem]);
  }

  public updatePromptInQueue(artQindex: number, pmtQItem: QueueItem): void {
    const promptQ = this.aiArticlesService.articlesQ.queueValue[artQindex].data as Queue;
    promptQ.update([pmtQItem]);
  }

  public removePromptFromQueue(artQindex: number, pmtQItem: QueueItem): void {
    const promptQ = this.aiArticlesService.articlesQ.queueValue[artQindex].data as Queue;
    promptQ.remove([pmtQItem]);
  }

  public addPromptInQueue(artQindex: number): void {
    const promptQ = this.aiArticlesService.articlesQ.queueValue[artQindex].data as Queue;
    const pmtQItem = new QueueItem({
      id: this.utilsService.getUniqueFromString(`article-prompt-${artQindex}`),
      data: {
        prompt: {
          prompt: '',
          message: {},
          promptType: OpenaiPromptTypeEnum.content
        } as OpenaiPrompt,
        heading: '',
      } as ArticlePrompt,
      status: QueueStatusEnum.notstarted,
      startTime: 0,
      completedTime: 0,
    } as QueueItem);

    promptQ.add([pmtQItem]);
  }

  public showQueueItemResultModal(artQindex: number, pmtQItem: QueueItem): void {
    this.currentMdText = pmtQItem.data.prompt?.message?.mdText || '';
    this.currentMdConvertedText = this.currentMdText;
  }

  public startArticlesQueue(event: any): void {
    this.aiArticlesService.articlesQ.start(
      1,
      AI_MAX_REQUEST_DELAY,
      AI_FAILED_REQUEST_DELAY,
    );
    this.errors = [];
  }

  public async saveArticle(articleQItem: QueueItem): Promise<void> {

    const article: Article = this.articleEditorService.createInitializedArticle(
      articleQItem.id,
    );

    let articleImage: string = '';

    const promptqItems: Array<QueueItem> = articleQItem.data.queueValue;

    promptqItems.forEach((qItem: QueueItem, index) => {
      const item: ArticlePrompt = qItem.data;

      // Set Image, if image prompt
      if (item.prompt.promptType === OpenaiPromptTypeEnum.image) {
        articleImage = item.prompt.message.mdText;
      } else {
        const jsonEl = this.articleEditorService.cleanAndFormatEditorEl(
          this.html2json.md2json(item.prompt.message.mdText),
        );

        if (jsonEl) {
          if (index === 0) {
            article.body = jsonEl;
          } else {
            switch (item.prompt.promptType) {
              case OpenaiPromptTypeEnum.keywords:
                article.metaInfo.keywords = this.articleEditorService
                  .readKeywordsFromEditorElement(jsonEl)
                  .join(', ');
                article.metaInfo['article:tag'] = article.metaInfo.keywords;
                break;
              case OpenaiPromptTypeEnum.description:
                article.metaInfo.description =
                  this.articleEditorService.readDescriptionFromEditorElement(jsonEl);
                break;
              case OpenaiPromptTypeEnum.questions:
                break;
              case OpenaiPromptTypeEnum.subtopics:
                break;
              default:
                article.body.children = [].concat(
                  article.body.children,
                  this.articleEditorService.generateArticleSubheading(item.heading || item.prompt.prompt || ''),
                  jsonEl.children
                );
            }
          }
        }
      }
    });


    // Save Image
    const imageFileInfo: ImageFileInfo = await this.fireStorageImageService.uploadImage(
      `${article.id}.jpg`,
      articleImage,
      true,
      this.fireAuthService.getCurrentUserId(),
      true
    )
      .catch(err => {
        this.pushStatusMsg('Saving Article Image failed', 'error', articleQItem.id);
        return null;
      });

    if (imageFileInfo) {
      article.image.src = `getImage?imageId=${imageFileInfo.fullPath}` || '';
      article.metaInfo.image = article.image.src;
    }

    this.pushStatusMsg('Saving Article Image DONE', 'success', articleQItem.id);

    // Save article to firebase
    const newArticle = await this.fireArticlesHttpService.addArticle(article)
      .catch(err => {
        this.pushStatusMsg('Saving Article failed', 'error', articleQItem.id);
        this.articleSaveStatus[articleQItem.id] = false;
        return null;
      });

    if (newArticle) {
      articleQItem.complete();
      this.aiArticlesService.articlesQ.updateQueueBatch([articleQItem]);
      this.pushStatusMsg('Saving Article DONE', 'success', articleQItem.id);
      this.articleSaveStatus[articleQItem.id] = true;
    }
  }

  public pushStatusMsg(msg: string, type: string, articleId: string = '', promptId: string = ''): void {
    this.errors.push(`
    <div>${articleId}   |   ${promptId}</div>
    <p class="${type}">${msg}</p>
    `);
  }

}
