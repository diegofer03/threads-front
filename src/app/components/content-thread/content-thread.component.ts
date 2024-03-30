import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Thread } from 'src/app/models/threads-content.model';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEllipsisHorizontalMini } from '@ng-icons/heroicons/mini'
import { RouterLink } from '@angular/router';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { ContentReplyComponent } from '../content-reply/content-reply.component';
import { faComment, faHeart } from '@ng-icons/font-awesome/regular'
import { heroHeart } from '@ng-icons/heroicons/outline'

@Component({
  selector: 'content-thread',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, DialogModule],
  templateUrl: './content-thread.component.html',
  viewProviders: [provideIcons({ heroEllipsisHorizontalMini, faComment, faHeart })],
  styleUrls: ['./content-thread.component.scss']
})
export class ContentThreadComponent {
  @Input() thread? : Thread

  constructor(public dialog: Dialog){}

  openReplyDialog() {
    this.dialog.open(ContentReplyComponent, {
      maxWidth: '650px',

      data: {
        thread: this.thread,
      },
    });
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
