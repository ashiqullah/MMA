import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRecordingPage } from './video-recording.page';

describe('VideoRecordingPage', () => {
  let component: VideoRecordingPage;
  let fixture: ComponentFixture<VideoRecordingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoRecordingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRecordingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
