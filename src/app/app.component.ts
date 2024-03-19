import { Component, HostBinding, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppServiceService } from './services/app-service.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
