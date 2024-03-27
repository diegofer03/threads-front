import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from 'src/app/services/session/session.service';
import {MatTabsModule} from '@angular/material/tabs';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { Title } from '@angular/platform-browser';

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
  private titleService = inject(Title)

  darkMode = this.appService.darkMode
  user = this.sessionService.user

  constructor(public dialog: Dialog){
    effect(() =>{
      if(this.user())
        this.titleService.setTitle(`${this.user()?.name}(@${this.user()?.userName})`)
    })
  }

  openCreateDialog() {
    this.dialog.open(EditDialogComponent, {
      maxWidth: '520px',

      data: {
        user: this.user(),
      },
    });
  }
}
