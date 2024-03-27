import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import { User } from 'src/app/models/user.model';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { SessionService } from 'src/app/services/session/session.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSpinner } from '@ng-icons/font-awesome/solid'

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIconComponent],
  viewProviders: [provideIcons({ faSolidSpinner })],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
  private appService = inject(AppServiceService)
  private sessionService = inject(SessionService)
  private authService = inject(AuthService)
  private formBuilder = inject(FormBuilder)

  darkMode = this.appService.darkMode
  loading = false
  user: User | null = this.sessionService.user()

  constructor(public dialogRef: DialogRef<string>,@Inject(DIALOG_DATA) public data: any) {}

  updateProfile = this.formBuilder.nonNullable.group({
    name: [this.user?.name, [Validators.minLength(3), Validators.required]],
    userName: [this.user?.userName, [Validators.minLength(3), Validators.required]]
  })

  update(){
    if(this.updateProfile.valid){
      this.loading = true
      const {name, userName} = this.updateProfile.getRawValue()
      const payload = {
        name: name,
        userName: userName
      }
      this.authService.updateProfile(this.user!._id ,payload).subscribe({
        next: (data) => {
          this.loading = false
          window.location.reload();
        },
        error: (error) => {
          this.loading = false
          console.log(error)
        }
      })
    }
  }
}
