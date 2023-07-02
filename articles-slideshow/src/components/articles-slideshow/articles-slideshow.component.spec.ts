import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesSlideshowComponent } from './articles-slideshow.component';

describe('ArticlesSlideshowComponent', () => {
  let component: ArticlesSlideshowComponent;
  let fixture: ComponentFixture<ArticlesSlideshowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesSlideshowComponent]
    });
    fixture = TestBed.createComponent(ArticlesSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
