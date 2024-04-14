import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ContentReplyComponent } from './content-reply.component';
import { SessionService } from 'src/app/services/session/session.service';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { FeedService } from 'src/app/services/feed/feed.service';
import { TextareaAutoresizeDirective } from 'src/app/directives/textarea-autoresize/textarea-autoresize.directive';
import { FormsModule } from '@angular/forms';
import { DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import { RouterModule } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HtmlParser } from '@angular/compiler';
import { defer, of } from 'rxjs';

fdescribe('ContentReplyComponent', () => {
  let component: ContentReplyComponent;
  let fixture: ComponentFixture<ContentReplyComponent>;
  let sessionService: jasmine.SpyObj<SessionService>
  let appService : jasmine.SpyObj<AppServiceService>
  let feedService : jasmine.SpyObj<FeedService>

  const mockThread = {
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
        { provide: DIALOG_DATA,  useValue: mockThread }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ContentReplyComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>
    appService = TestBed.inject(AppServiceService) as jasmine.SpyObj<AppServiceService>
    feedService = TestBed.inject(FeedService) as jasmine.SpyObj<FeedService>

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

  it('should render tweet thread', () => {
    const threadElement: HTMLElement = fixture.debugElement.query(By.css('#thread_text')).nativeElement
    const threadUser: HTMLElement = fixture.debugElement.query(By.css('#thread_username')).nativeElement

    expect(threadElement.textContent).toContain(mockThread.thread.text)
    expect(threadUser.textContent).toContain(mockThread.thread.user.userName)
  })

  it('should threadContent field be required', () => {
    component.threadContent.setValue('')
    expect(component.threadContent.invalid).toBeTruthy()

    component.threadContent.setValue('test thread')
    expect(component.threadContent.valid).toBeTruthy()
  })

  it('should complete succesfully request', fakeAsync(() => {
    component.threadContent.setValue('test thread comment')
    feedService.createThread.and.returnValue(defer(() => Promise.resolve({})))
    component.replyThread()
    fixture.detectChanges()
    expect(component.threadContent.valid).toBeTruthy()
    expect(component.loading).toBeTruthy()
    tick()
    expect(feedService.createThread).toHaveBeenCalled()
    expect(component.loading).toBeFalsy()
  }))

  it('should submit request from ui', fakeAsync(() => {
    const threadcontent: HTMLTextAreaElement = fixture.debugElement.query(By.css('#thread_content')).nativeElement
    threadcontent.value = 'test thread comment'
    component.threadContent.setValue('test thread comment')
    feedService.createThread.and.returnValue(defer(() => Promise.resolve({})))
    const threadCrtButton = fixture.debugElement.query(By.css('#createBtn'))
    threadCrtButton.triggerEventHandler('click', null)
    fixture.detectChanges()
    expect(component.threadContent.valid).toBeTruthy()
    expect(component.loading).toBeTruthy()
    tick()
    expect(feedService.createThread).toHaveBeenCalled()
    expect(component.loading).toBeFalsy()
  }))
});
