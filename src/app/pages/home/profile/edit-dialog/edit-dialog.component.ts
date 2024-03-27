import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import { User } from 'src/app/models/user.model';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
  private appService = inject(AppServiceService)
  private sessionService = inject(SessionService)

  darkMode = this.appService.darkMode
  loading = false
  user: User | null = this.sessionService.user()

  constructor(public dialogRef: DialogRef<string>,@Inject(DIALOG_DATA) public data: any) {}
}
