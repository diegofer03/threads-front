import { Component, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateThreadComponent } from 'src/app/components/create-thread/create-thread.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { BurgerMenuComponent } from 'src/app/components/navbar/burger-menu/burger-menu.component';
import { AppServiceService } from 'src/app/services/app/app-service.service';
import { SessionService } from 'src/app/services/session/session.service';
import { jwtDecode } from 'jwt-decode';
import { Token } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CreateThreadComponent, RouterOutlet, NavbarComponent, BurgerMenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private appService = inject(AppServiceService)
  private sessionService = inject(SessionService)
  private authService = inject(AuthService)

  title = 'threads-front';
  darkMode = this.appService.darkMode

  @HostBinding('class.dark') get mode(){
    return this.darkMode()
  }

  ngOnInit(){
    const token = this.sessionService.getToken()
    const dataToken: Token  = jwtDecode(token)
    this.authService.profile(dataToken.sub).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  toggleDarkMode(){
    this.darkMode.set(!this.darkMode())
  }
}
