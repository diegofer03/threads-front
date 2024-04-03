import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentReplyComponent } from './content-reply.component';
import { SessionService } from 'src/app/services/session/session.service';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { FeedService } from 'src/app/services/feed/feed.service';
import { TextareaAutoresizeDirective } from 'src/app/directives/textarea-autoresize/textarea-autoresize.directive';
import { FormsModule } from '@angular/forms';

fdescribe('ContentReplyComponent', () => {
  let component: ContentReplyComponent;
  let fixture: ComponentFixture<ContentReplyComponent>;
  let sessionService: jasmine.SpyObj<SessionService>
  let appService : jasmine.SpyObj<AppServiceService>
  let feedService : jasmine.SpyObj<FeedService>

  beforeEach(() => {
    const spySessionService = jasmine.createSpyObj<SessionService>('SessionService', ['user'])
    const spyAppService = jasmine.createSpyObj<AppServiceService>('AppService', ['darkMode'])
    const spyFeedService = jasmine.createSpyObj<FeedService>('FeedService', ['createThread'])

    TestBed.configureTestingModule({
      declarations: [TextareaAutoresizeDirective],
      imports: [ContentReplyComponent, FormsModule],
      providers: [
        {provide: SessionService, useValue: spySessionService},
        {provide: AppServiceService, useValue: spyAppService},
        {provide: FeedService, useValue: spyFeedService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ContentReplyComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>
    appService = TestBed.inject(AppServiceService) as jasmine.SpyObj<AppServiceService>
    feedService = TestBed.inject(FeedService) as jasmine.SpyObj<FeedService>

    sessionService.user.and.returnValue({_id: '1234',
      name: 'alex',
      email: 'alex@mail.com',
      userName: 'alex22',})

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
