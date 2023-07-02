import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenaiAutoArticlesComponent } from './openai-auto-articles.component';

describe('OpenaiAutoArticlesComponent', () => {
  let component: OpenaiAutoArticlesComponent;
  let fixture: ComponentFixture<OpenaiAutoArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenaiAutoArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenaiAutoArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
