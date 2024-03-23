import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AppServiceService } from 'src/app/services/app-service.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  private appService = inject(AppServiceService)
  darkMode = this.appService.darkMode
  constructor(public dialogRef: DialogRef<string>,@Inject(DIALOG_DATA) public data: any) {}

  threadContent = new FormControl('',[
    Validators.required,
  ])

  createThread(){
    if(this.threadContent.valid){
      console.log(this.threadContent.value)
    }
  }
}
