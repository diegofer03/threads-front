import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { heroHomeMini } from '@ng-icons/heroicons/mini';
import { heroUser, heroMagnifyingGlass, heroHeart, heroPencilSquare } from '@ng-icons/heroicons/outline'
import { DialogComponent } from '../create-thread/dialog/dialog.component';
import { RouterLink } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [NgIconComponent, CommonModule, DialogModule, RouterLink],
  viewProviders: [provideIcons({ heroHomeMini, heroUser, heroMagnifyingGlass, heroHeart, heroPencilSquare })],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private sessionService = inject(SessionService)
  user = this.sessionService.user

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
