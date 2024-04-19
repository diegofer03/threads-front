import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { SessionService } from 'src/app/services/session/session.service';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { FeedService } from 'src/app/services/feed/feed.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

fdescribe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let sessionService: jasmine.SpyObj<SessionService>
  let appService: jasmine.SpyObj<AppServiceService>
  let feedService: jasmine.SpyObj<FeedService>

  beforeEach(() => {
    const spySessionService = jasmine.createSpyObj<SessionService>('SessionService', ['user'])
    const spyAppService = jasmine.createSpyObj<AppServiceService>('AppService', ['darkMode'])
    const spyFeedService = jasmine.createSpyObj<FeedService>('FeedService', ['createThread'])

    TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [
        {provide: SessionService, useValue: spySessionService},
        {provide: AppServiceService, usevalue: spyAppService},
        {provide: FeedService, useValue: spyFeedService},
        { provide: DialogRef, useValue: {} },
        { provide: DIALOG_DATA,  useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>
    appService = TestBed.inject(AppServiceService) as jasmine.SpyObj<AppServiceService>
    feedService =  TestBed.inject(FeedService) as jasmine.SpyObj<FeedService>

    sessionService.user.and.returnValue({
      _id: '1234',
      name: 'alex',
      email: 'alex@mail.com',
      userName: 'alex22',
    })
    component.user = {
      _id: '1234',
      name: 'alex',
      email: 'alex@mail.com',
      userName: 'alex22',
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
