import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline'
import { FeedService } from 'src/app/services/feed/feed.service';
import { User } from 'src/app/models/user.model';
import { faSolidSpinner } from '@ng-icons/font-awesome/solid'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink],
  viewProviders: [provideIcons({ heroMagnifyingGlass, faSolidSpinner })],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private feedService = inject(FeedService)
  users: User[] = []
  loading =  false

  ngOnInit(){
    this.loading = true
    this.feedService.getUsers().subscribe({
      next: (data) => {
        this.users = data
        this.loading = false
      },
      error: (error) => {
        this.loading = false
        console.log(error)
      }
    })
  }
}
