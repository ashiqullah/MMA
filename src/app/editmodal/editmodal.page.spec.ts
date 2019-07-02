import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmodalPage } from './editmodal.page';

describe('EditmodalPage', () => {
  let component: EditmodalPage;
  let fixture: ComponentFixture<EditmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
