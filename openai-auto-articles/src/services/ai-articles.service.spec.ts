import { TestBed } from '@angular/core/testing';

import { AiArticlesService } from './ai-articles.service';

describe('AiArticlesService', () => {
  let service: AiArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
