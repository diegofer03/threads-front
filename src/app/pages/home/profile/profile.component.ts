import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from 'src/app/services/session/session.service';
import {MatTabsModule} from '@angular/material/tabs';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { Title } from '@angular/platform-browser';
import { ContentThreadComponent } from 'src/app/components/content-thread/content-thread.component';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FeedService } from 'src/app/services/feed/feed.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DialogModule, ContentThreadComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private sessionService = inject(SessionService)
  private authService = inject(AuthService)
  private feedService = inject(FeedService)
  private appService = inject(AppServiceService)
  private titleService = inject(Title)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  userName : string | null
  otherUserFlag = true
  userSession = this.sessionService.user
  @Input() profileUser? : User

  darkMode = this.appService.darkMode
  user = signal<User | null>(null)

  contentMock = {
    "_id": "6602ffddcfcc5ab028cf6b15",
    "text": "La candidata de la unidad venezolana, Corina Yoris, enfatizó que no han podido acceder al sistema de postulaciones y tampoco han podido llevar la solicitud de prórroga porque los accesos al Consejo Nacional Electoral (CNE), en el centro de Caracas, están cerrados este 25 de marzo.",
    "user": {
        "_id": "65efa438ac87507d554d0af4",
        "name": "Alex Fernandez",
        "email": "ferxxo@mail.com",
        "userName": "ferxxo",
        "__v": 0
    },
    "likes": 3,
    "parent": null,
    "createdAt": "2024-03-26T17:03:25.826Z",
    "updatedAt": "2024-03-26T17:03:25.826Z",
    "__v": 0
}

  constructor(public dialog: Dialog){
    this.userName = this.route.snapshot.paramMap.get('id')
    effect(() =>{
      if(this.user())
        this.titleService.setTitle(`${this.user()?.name} (@${this.user()?.userName})`)
    })
    effect(() => {
      if(this.userName !== this.userSession()?.userName) this.otherUserFlag = false
      else this.otherUserFlag = true
    })
  }

  ngOnInit(){
    this.getUserData()
    this.router.events.subscribe((val) => {
      // see also
      this.otherUserFlag = true
      if(val instanceof NavigationEnd){
        this.userName = this.route.snapshot.paramMap.get('id')
        if(this.userName){
          if(this.userName !== this.userSession()?.userName){
            this.otherUserFlag = false
            this.feedService.getUserByUsername({userName: this.userName!}).subscribe({
              next: (data) => {
                this.user.update((user) => {return { ...user, _id: data[0]._id,
                  name: data[0].name,
                  email: data[0].email,
                  userName: data[0].userName, }})


              },
              error: (error) => {
                console.log(error)
              }
            })
          }else{
            this.user.set(this.userSession())
          }
        }else{
          this.router.navigate(['/home'])
        }
      }
    });
  }

  openCreateDialog() {
    this.dialog.open(EditDialogComponent, {
      maxWidth: '520px',

      data: {
        user: this.user(),
      },
    });
  }

  getUserData(){
    this.feedService.getUserByUsername({userName: this.userName!}).subscribe({
      next: (data) => {
        this.user.set(data[0])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
