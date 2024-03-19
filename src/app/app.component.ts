import { Component, HostBinding, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BottombarComponent } from './components/navbar-mobile/bottombar/bottombar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BottombarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'threads-front';
  darkMode = signal<boolean>(false)

  @HostBinding('class.dark') get mode(){
    return this.darkMode()
  }
}
