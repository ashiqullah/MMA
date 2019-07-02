import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResurcesPage } from './resurces.page';

describe('ResurcesPage', () => {
  let component: ResurcesPage;
  let fixture: ComponentFixture<ResurcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResurcesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResurcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
