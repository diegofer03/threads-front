import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentReplyComponent } from './content-reply.component';
import { SessionService } from 'src/app/services/session/session.service';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { FeedService } from 'src/app/services/feed/feed.service';
import { TextareaAutoresizeDirective } from 'src/app/directives/textarea-autoresize/textarea-autoresize.directive';
import { FormsModule } from '@angular/forms';
import { DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import { RouterModule } from '@angular/router';

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
      declarations: [],
      imports: [ContentReplyComponent, FormsModule, RouterModule.forRoot([])],
      providers: [
        {provide: SessionService, useValue: spySessionService},
        {provide: AppServiceService, useValue: spyAppService},
        {provide: FeedService, useValue: spyFeedService},
        { provide: DialogRef, useValue: {} },
        { provide: DIALOG_DATA,  useValue: {
            thread: {
              _id: '1234',
              text: 'test unit',
              user: {
                _id: '123',
                name: 'reply',
                email: 'reply@mail.com',
                userName: 'reply99',
              },
              parent: '123456',
              createdAt: '04-02-2024',
              updatedAt: '04-02-2024',
              likes: 2
            }
          }
        }
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
