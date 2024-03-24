import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppServiceService } from 'src/app/services/app-service.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  appService = inject(AppServiceService)
  formBuilder = inject(FormBuilder)
  darkMode = this.appService.darkMode

  loginForm = this.formBuilder.nonNullable.group({
    user: ['', [ Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });

  login(){
    const { user, password } = this.loginForm.getRawValue()
    console.log(user, password)
  }
}
