import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastsPage } from './casts.page';

describe('CastsPage', () => {
  let component: CastsPage;
  let fixture: ComponentFixture<CastsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
