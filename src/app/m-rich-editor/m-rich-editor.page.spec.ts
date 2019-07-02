import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRichEditorPage } from './m-rich-editor.page';

describe('MRichEditorPage', () => {
  let component: MRichEditorPage;
  let fixture: ComponentFixture<MRichEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRichEditorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRichEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
