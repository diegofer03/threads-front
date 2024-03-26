import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentThreadComponent } from './content-thread.component';

describe('ContentThreadComponent', () => {
  let component: ContentThreadComponent;
  let fixture: ComponentFixture<ContentThreadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContentThreadComponent]
    });
    fixture = TestBed.createComponent(ContentThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
