import { Component, Inject, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SessionService } from 'src/app/services/session/session.service';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { FeedService } from 'src/app/services/feed/feed.service';
import { User } from 'src/app/models/user.model';
import { DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSpinner } from '@ng-icons/font-awesome/solid'
import { TextareaAutoresizeDirective } from 'src/app/directives/textarea-autoresize/textarea-autoresize.directive';
import { ContentThreadComponent } from '../content-thread/content-thread.component';
import { Thread } from 'src/app/models/threads-content.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-content-reply',
  standalone: true,
  imports: [CommonModule, NgIconComponent, TextareaAutoresizeDirective, ReactiveFormsModule, ContentThreadComponent, RouterLink],
  viewProviders: [provideIcons({ faSolidSpinner })],
  templateUrl: './content-reply.component.html',
  styleUrls: ['./content-reply.component.scss']
})
export class ContentReplyComponent {
  private sessionService = inject(SessionService)
  private appService = inject(AppServiceService)
  private feedService = inject(FeedService)
  private location = inject(Location)

  darkMode = this.appService.darkMode
  loading = false
  user: User | null = this.sessionService.user()
  thread: Thread

  constructor(public dialogRef: DialogRef<string>,@Inject(DIALOG_DATA) public data: any) {
    this.thread = data.thread
  }

  threadContent = new FormControl('',[
    Validators.required,
  ])

  replyThread(){
    if(this.threadContent.valid){
      this.loading = true
      const payload = {
        parentId: this.thread._id,
        userId: this.user!._id,
        text: this.threadContent.value!
      }
      this.feedService.createThread(payload).subscribe({
        next: (data) => {
          this.loading = false
          this.location.historyGo(0);
        },
        error: (error) => {
          this.loading = false
          console.log(error)
        }
      })
    }
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
}
