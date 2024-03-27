import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from 'src/app/services/session/session.service';
import {MatTabsModule} from '@angular/material/tabs';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DialogModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private sessionService = inject(SessionService)
  private appService = inject(AppServiceService)
  darkMode = this.appService.darkMode
  user = this.sessionService.user()

  constructor(public dialog: Dialog){}

  openCreateDialog() {
    this.dialog.open(EditDialogComponent, {
      maxWidth: '520px',

      data: {
        user: this.user,
      },
    });
  }
}
