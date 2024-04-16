import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Thread } from 'src/app/models/threads-content.model';
import { ContentThreadComponent } from './content-thread.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

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

@Component({
  template: `<content-thread [thread]="thread" />`
})
class HostComponent{
  thread = {
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

fdescribe('HostComponent', () => {
  let component: HostComponent
  let fixture: ComponentFixture<HostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ContentThreadComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(HostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create host component', () => {
    expect(component).toBeTruthy()
  })

  it('should render child component PeopleComponent', () => {
    const expectedText = component.thread.text
    const contentElem: HTMLElement = fixture.debugElement.query(By.css('#thread_text')).nativeElement
    const threadContent = contentElem.textContent
    fixture.detectChanges()

    expect(threadContent).toContain(expectedText)
  })

  // it('should get data from child output', () => {
  //   const expectedPerson = component.person
  //   clickEvent(fixture, 'app-people .btn-choose')
  //   fixture.detectChanges()

  //   expect(component.selectedPerson).toEqual(expectedPerson)
  // })
})
