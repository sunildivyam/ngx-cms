import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsImageFormComponent } from './cms-image-form.component';

describe('CmsImageFormComponent', () => {
  let component: CmsImageFormComponent;
  let fixture: ComponentFixture<CmsImageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsImageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
