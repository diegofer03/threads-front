import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidSpinner } from '@ng-icons/font-awesome/solid'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIconComponent],
  viewProviders: [provideIcons({ faSolidSpinner })],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authService = inject(AuthService)
  router = inject(Router)
  appService = inject(AppServiceService)
  formBuilder = inject(FormBuilder)
  toastr = inject(ToastrService)

  darkMode = this.appService.darkMode

  loading = false

  loginForm = this.formBuilder.nonNullable.group({
    user: ['alex@mail.com', [ ]],
    password: ['12345678', [ ]],
  });

  constructor(){
    this.loginForm.controls['user'];
    this.loginForm.controls['password'];
  }

  login(){
    const { user, password } = this.loginForm.getRawValue()
    if(!user) this.toastr.error(undefined, 'Enter your Instagram username, phone or email.', {
        "positionClass": "toast-bottom-center",
      });
    if(!password) this.toastr.error(undefined, 'Enter your password.', {
        "positionClass": "toast-bottom-center",
      });
    // if(this.loginForm.valid){
      this.loading = true
      this.authService.login(user, password).subscribe({
        next: (data) => {
          this.loading = false
          this.router.navigate(['/home'])
        },
        error: (error) => {
          this.loading = false
          this.toastr.error(undefined, 'Sorry, your password or user was incorrect. Please double-check.', {
            "positionClass": "toast-bottom-center",
          });
        }
      })
    // }
    //Sorry, your password was incorrect. Please double-check your password.
  }
}
