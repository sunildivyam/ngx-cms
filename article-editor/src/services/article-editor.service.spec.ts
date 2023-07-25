import { TestBed } from '@angular/core/testing';

import { ArticleEditorService } from './article-editor.service';

describe('ArticleEditorService', () => {
  let service: ArticleEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
