import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentReplyComponent } from './content-reply.component';

describe('ContentReplyComponent', () => {
  let component: ContentReplyComponent;
  let fixture: ComponentFixture<ContentReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContentReplyComponent]
    });
    fixture = TestBed.createComponent(ContentReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
