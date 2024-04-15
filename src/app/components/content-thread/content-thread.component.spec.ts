import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentThreadComponent } from './content-thread.component';
import { RouterModule } from '@angular/router';

fdescribe('ContentThreadComponent', () => {
  let component: ContentThreadComponent;
  let fixture: ComponentFixture<ContentThreadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContentThreadComponent, RouterModule.forRoot([])]
    });
    fixture = TestBed.createComponent(ContentThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
