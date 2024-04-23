import { Component, Inject, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaAutoresizeDirective } from 'src/app/directives/textarea-autoresize/textarea-autoresize.directive';
import { User } from 'src/app/models/user.model';
import { FeedService } from 'src/app/services/feed/feed.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSpinner } from '@ng-icons/font-awesome/solid'
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, TextareaAutoresizeDirective, NgIconComponent],
  viewProviders: [provideIcons({ faSolidSpinner })],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  private appService = inject(AppServiceService)
  private feedService = inject(FeedService)
  private sessionService = inject(SessionService)
  private location = inject(Location)

  darkMode = this.appService.darkMode
  loading = false
  user: User | null = this.sessionService.user()

  constructor(public dialogRef: DialogRef<string>,@Inject(DIALOG_DATA) public data: any) {}

  threadContent = new FormControl('',[
    Validators.required,
  ])

  getRandomColor(){
    return this.appService.getRandomColor()
  }

  createThread(){
    if(this.threadContent.valid){
      this.loading = true
      const payload = {
        userId: this.user!._id,
        text: this.threadContent.value!
      }
      this.feedService.createThread(payload).subscribe({
        next: (data) => {
          this.loading = false
          this.location.historyGo(0)
        },
        error: (error) => {
          this.loading = false
          console.log(error)
        }
      })
    }
  }
}
