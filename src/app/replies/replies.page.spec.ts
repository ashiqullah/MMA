import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliesPage } from './replies.page';

describe('RepliesPage', () => {
  let component: RepliesPage;
  let fixture: ComponentFixture<RepliesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepliesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepliesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
