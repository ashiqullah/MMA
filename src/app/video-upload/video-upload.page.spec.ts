import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadPage } from './video-upload.page';

describe('VideoUploadPage', () => {
  let component: VideoUploadPage;
  let fixture: ComponentFixture<VideoUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
