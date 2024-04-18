import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThreadComponent } from './create-thread.component';
import { SessionService } from 'src/app/services/session/session.service';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { By } from '@angular/platform-browser';

fdescribe('CreateThreadComponent', () => {
  let component: CreateThreadComponent;
  let fixture: ComponentFixture<CreateThreadComponent>;
  let sessionService: jasmine.SpyObj<SessionService>
  let appService: jasmine.SpyObj<AppServiceService>

  beforeEach(() => {
    const spySessionService = jasmine.createSpyObj<SessionService>('SessionService', ['user'])
    const spyAppService = jasmine.createSpyObj<AppServiceService>('AppService', ['darkMode'])

    TestBed.configureTestingModule({
      imports: [CreateThreadComponent],
      providers: [
        {provide: SessionService, useValue: spySessionService},
        {provide: AppServiceService, useValue: spyAppService}
      ]
    });
    fixture = TestBed.createComponent(CreateThreadComponent);
    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>
    appService = TestBed.inject(AppServiceService) as jasmine.SpyObj<AppServiceService>
    component = fixture.componentInstance;
    sessionService.user.and.returnValue({
      _id: '1234',
      name: 'alex',
      email: 'alex@mail.com',
      userName: 'alex22',
    })
    // component.user = {
    //   _id: '1234',
    //   name: 'alex',
    //   email: 'alex@mail.com',
    //   userName: 'alex22',
    // }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user datas', () => {
    const imgElement: HTMLImageElement = fixture.debugElement.query(By.css('#user_img')).nativeElement
    expect(imgElement.src).toContain(component.user()!.name)
  })
});
