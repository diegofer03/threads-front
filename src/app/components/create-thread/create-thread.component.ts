import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { SessionService } from 'src/app/services/session/session.service';
import { User } from 'src/app/models/user.model';
import { AppServiceService } from 'src/app/services/app/app-service.service';

@Component({
  selector: 'create-thread',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.scss']
})
export class CreateThreadComponent {
  private sessionService = inject(SessionService)
  private appService = inject(AppServiceService)
  user = this.sessionService.user

  constructor(public dialog: Dialog) {}

  getRandomColor(){
    return this.appService.getRandomColor()
  }

  openCreateDialog() {
    this.dialog.open(DialogComponent, {
      maxWidth: '650px',

      data: {
        user: this.user(),
      },
    });
  }
}
