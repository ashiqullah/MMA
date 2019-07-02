import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNewsPage } from './new-news.page';

describe('NewNewsPage', () => {
  let component: NewNewsPage;
  let fixture: ComponentFixture<NewNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
