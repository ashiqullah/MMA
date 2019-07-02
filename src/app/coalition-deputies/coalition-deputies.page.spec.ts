import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalitionDeputiesPage } from './coalition-deputies.page';

describe('CoalitionDeputiesPage', () => {
  let component: CoalitionDeputiesPage;
  let fixture: ComponentFixture<CoalitionDeputiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoalitionDeputiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoalitionDeputiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
