import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafElementComponent } from './leaf-element.component';

describe('LeafElementComponent', () => {
  let component: LeafElementComponent;
  let fixture: ComponentFixture<LeafElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
