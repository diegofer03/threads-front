import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
// import { featherAirplay } from '@ng-icons/feather-icons';
import { heroHomeMini } from '@ng-icons/heroicons/mini';
import { heroUser, heroMagnifyingGlass, heroHeart, heroPencilSquare } from '@ng-icons/heroicons/outline'

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [provideIcons({ heroHomeMini, heroUser, heroMagnifyingGlass, heroHeart, heroPencilSquare })],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

}
