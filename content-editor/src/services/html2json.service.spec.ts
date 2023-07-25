import { TestBed } from '@angular/core/testing';

import { Html2JsonService } from './html2json.service';

describe('Html2JsonService', () => {
  let service: Html2JsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Html2JsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
