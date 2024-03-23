import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'create-thread',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.scss']
})
export class CreateThreadComponent {
  constructor(public dialog: Dialog) {}

  openCreateDialog() {
    this.dialog.open(DialogComponent, {
      maxWidth: '650px',

      data: {
        animal: 'panda',
      },
    });
  }
}
