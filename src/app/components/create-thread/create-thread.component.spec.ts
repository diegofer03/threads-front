import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThreadComponent } from './create-thread.component';
import { SessionService } from 'src/app/services/session/session.service';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { By } from '@angular/platform-browser';
import { Dialog } from '@angular/cdk/dialog';

describe('CreateThreadComponent', () => {
  let component: CreateThreadComponent;
  let fixture: ComponentFixture<CreateThreadComponent>;
  let sessionService: jasmine.SpyObj<SessionService>
  let appService: jasmine.SpyObj<AppServiceService>
  let dialog: jasmine.SpyObj<Dialog>

  beforeEach(() => {
    const spySessionService = jasmine.createSpyObj<SessionService>('SessionService', ['user'])
    const spyAppService = jasmine.createSpyObj<AppServiceService>('AppService', ['darkMode'])
    const spyDialog = jasmine.createSpyObj('Dialog', ['open'])

    TestBed.configureTestingModule({
      imports: [CreateThreadComponent],
      providers: [
        {provide: SessionService, useValue: spySessionService},
        {provide: AppServiceService, useValue: spyAppService},
        // {provide: Dialog, useValue: spyDialog}
      ]
    });
    fixture = TestBed.createComponent(CreateThreadComponent);
    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>
    appService = TestBed.inject(AppServiceService) as jasmine.SpyObj<AppServiceService>
    // dialog = TestBed.inject(Dialog) as jasmine.SpyObj<Dialog>
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

  // it('should call to open dialog', () => {
  //   dialog.open.and.returnValue()
  //   component.openCreateDialog()
  //   fixture.detectChanges()
  //   expect(dialog.open).toHaveBeenCalled()
  // })
});
