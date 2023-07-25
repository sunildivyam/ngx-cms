import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryArticlesListComponent } from './category-articles-list.component';

describe('CategoryArticlesListComponent', () => {
  let component: CategoryArticlesListComponent;
  let fixture: ComponentFixture<CategoryArticlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryArticlesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
