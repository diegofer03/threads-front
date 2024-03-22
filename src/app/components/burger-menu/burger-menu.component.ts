import { Component, HostBinding, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { cssMenuRight } from '@ng-icons/css.gg'
import {OverlayModule} from '@angular/cdk/overlay';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'burger-menu',
  standalone: true,
  imports: [NgIconComponent, CommonModule, OverlayModule],
  viewProviders: [provideIcons({ cssMenuRight })],
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent {
  private appService = inject(AppServiceService)
  darkMode = this.appService.darkMode

  isOpen: boolean = false;
}
