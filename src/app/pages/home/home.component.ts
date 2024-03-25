import { Component, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateThreadComponent } from 'src/app/components/create-thread/create-thread.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { BurgerMenuComponent } from 'src/app/components/navbar/burger-menu/burger-menu.component';
import { AppServiceService } from 'src/app/services/app/app-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CreateThreadComponent, RouterOutlet, NavbarComponent, BurgerMenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private appService = inject(AppServiceService)
  title = 'threads-front';
  darkMode = this.appService.darkMode

  @HostBinding('class.dark') get mode(){
    return this.darkMode()
  }

  toggleDarkMode(){
    this.darkMode.set(!this.darkMode())
  }
}
