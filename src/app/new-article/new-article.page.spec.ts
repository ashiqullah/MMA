import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticlePage } from './new-article.page';

describe('NewArticlePage', () => {
  let component: NewArticlePage;
  let fixture: ComponentFixture<NewArticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArticlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
