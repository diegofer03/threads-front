import { Component, HostBinding, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { cssMenuRight } from '@ng-icons/css.gg'
import {OverlayModule} from '@angular/cdk/overlay';
import { AppServiceService } from 'src/app/services/app-service.service';
import { heroArrowLeft, heroMoon, heroSun } from '@ng-icons/heroicons/outline';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'burger-menu',
  standalone: true,
  imports: [NgIconComponent, CommonModule, OverlayModule, FormsModule],
  viewProviders: [provideIcons({ cssMenuRight, heroArrowLeft, heroSun, heroMoon })],
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent {
  private appService = inject(AppServiceService)
  darkMode = this.appService.darkMode
  selectedTheme = this.appService.getCurrentTheme()

  isOpen: boolean = false;

  showThemeOptions: boolean = false

  cheked: boolean = false

  closeToggle(){
    this.showThemeOptions = false
    this.isOpen = false
  }

  changeTheme(event : any){
    const theme = event.target.value as 'light' | 'dark' | 'system'
    this.appService.setTheme(theme)
  }
}
