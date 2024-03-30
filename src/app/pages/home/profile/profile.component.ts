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
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { FeedService } from 'src/app/services/feed/feed.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSpinner } from '@ng-icons/font-awesome/solid'
import { Thread } from 'src/app/models/threads-content.model';
import { heroEllipsisHorizontalMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DialogModule, ContentThreadComponent, NgIconComponent, RouterLink],
  viewProviders: [provideIcons({ faSolidSpinner, heroEllipsisHorizontalMini })],
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
  loading = false
  threads: Thread[] = []
  replies: Thread[] = []

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
            this.loading = true
            this.feedService.getUserByUsername({userName: this.userName!}).subscribe({
              next: (data) => {
                this.user.update((user) => {return { ...user, _id: data[0]._id,
                  name: data[0].name,
                  email: data[0].email,
                  userName: data[0].userName, }})
                  this.loading = false
                this.getTopThreads()
                this.getRepliesThreads()
              },
              error: (error) => {
                console.log(error)
                this.loading = false
              }
            })
          }else{
            this.user.set(this.userSession())
            this.getTopThreads()
            this.getRepliesThreads()
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
    this.loading = true
    this.feedService.getUserByUsername({userName: this.userName!}).subscribe({
      next: (data) => {
        this.user.set(data[0])
        this.loading = false
        this.getTopThreads()
        this.getRepliesThreads()
      },
      error: (error) => {
        this.loading = false
        console.log(error)
      }
    })
  }

  getTopThreads(){
    this.loading = true
    this.feedService.getTopByUserId(this.user()!._id).subscribe({
      next: (data) => {
        this.threads = data
        this.loading = false
      },
      error: (error) => {
        this.loading = false
        console.log(error)
      }
    })
  }

  getRepliesThreads(){
    this.loading = true
    this.feedService.getRepliesByUserId(this.user()!._id).subscribe({
      next: (data) => {
        this.replies = data
        this.loading = false
      },
      error: (error) => {
        this.loading = false
        console.log(error)
      }
    })
  }

  timeSince(date : any){
    var seconds = Math.floor((new Date().valueOf() - new Date(date).valueOf()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  getUserParent(id: string){

  }
}
