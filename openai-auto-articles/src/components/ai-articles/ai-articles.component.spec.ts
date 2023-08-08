import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiArticlesComponent } from './ai-articles.component';

describe('AiArticlesComponent', () => {
  let component: AiArticlesComponent;
  let fixture: ComponentFixture<AiArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiArticlesComponent]
    });
    fixture = TestBed.createComponent(AiArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
